package com.foodmanager.foodplan;

import com.foodmanager.models.Food;
import com.foodmanager.models.FoodRequest;
import com.foodmanager.models.Ingredient;
import com.foodmanager.models.IngredientInfoRequest;
import com.foodmanager.models.UnitOfMeasure;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.util.Collections.EMPTY_LIST;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
class FoodServiceTest {
    private FoodService foodService;
    private FoodRepository foodRepository;
    private IngredientRepository ingredientRepository;
    private final String DEFAULT_FOOD_NAME = "Test food";
    private final int DEFAULT_FOOD_CCAL = 100;
    private final int DEFAULT_FOOD_PROTEIN = 10;
    private final int DEFAULT_FOOD_FAT = 5;
    private final int DEFAULT_FOOD_CARBS = 15;
    private final String DEFAULT_RECIPE = "Test recipe";

    @Autowired
    public FoodServiceTest(FoodService foodService, FoodRepository foodRepository, IngredientRepository ingredientRepository) {
        this.foodService = foodService;
        this.foodRepository = foodRepository;
        this.ingredientRepository = ingredientRepository;
        propagateIngredientRepository();
    }

    public void propagateIngredientRepository() {
        Ingredient ingredient1 = new Ingredient(1L, "Test Ingredient1", null);
        Ingredient ingredient2 = new Ingredient(2L, "Test Ingredient2", null);
        Ingredient ingredient3 = new Ingredient(3L, "Test Ingredient3", null);
        ingredientRepository.saveAll(List.of(
                ingredient1,
                ingredient2,
                ingredient3
        ));
    }

    @Test
    @Transactional
    @DirtiesContext
    void addFoodNoIngredientsTest() {
        FoodRequest foodRequest = getDefaultFood();

        Food savedFood = foodService.addFood(foodRequest);

        assertThat(foodRepository.count()).isEqualTo(1);
        assertThat(savedFood.getName()).isEqualTo(DEFAULT_FOOD_NAME);
        assertThat(savedFood.getCcal()).isEqualTo(DEFAULT_FOOD_CCAL);
        assertThat(savedFood.getProtein()).isEqualTo(DEFAULT_FOOD_PROTEIN);
        assertThat(savedFood.getFat()).isEqualTo(DEFAULT_FOOD_FAT);
        assertThat(savedFood.getCarbs()).isEqualTo(DEFAULT_FOOD_CARBS);
        assertThat(savedFood.getRecipe()).isEqualTo(DEFAULT_RECIPE);
    }

    @Test
    @Transactional
    @DirtiesContext
    void addFoodWithIngredientsTest() {
        FoodRequest foodRequest = getDefaultFood();

        foodRequest.setIngredients(List.of(
                new IngredientInfoRequest(1L, 50, UnitOfMeasure.GRAM),
                new IngredientInfoRequest(2L, 1, UnitOfMeasure.UNIT),
                new IngredientInfoRequest(3L, 15, UnitOfMeasure.ML)
        ));

        Food savedFood = foodService.addFood(foodRequest);

        assertThat(foodRepository.count()).isEqualTo(1);
        assertThat(savedFood.getIngredients().size()).isEqualTo(3);
    }

    @Test
    @Transactional
    @DirtiesContext
    void deleteFoodTest() {
        FoodRequest foodRequest = getDefaultFood();

        Food savedFood = foodService.addFood(foodRequest);
        assertThat(foodRepository.count()).isEqualTo(1);

        foodService.deleteFood(savedFood.getId());

        assertThat(foodRepository.count()).isEqualTo(0);
    }

    @Test
    @Transactional
    @DirtiesContext
    void addFoodNonExistentIngredientTest() {
        FoodRequest foodRequest = getDefaultFood();

        foodRequest.setIngredients(List.of(
                new IngredientInfoRequest(999L, 5, UnitOfMeasure.GRAM)
        ));

        assertThrows(
                RuntimeException.class,
                () -> {foodService.addFood(foodRequest);},
                "can't find ingredient with id 999"
        );
    }

    @Test
    @Transactional
    @DirtiesContext
    @Disabled
    void addFoodWithTwoIngredientOfSameIdTest() {
        FoodRequest foodRequest = new FoodRequest(
                "Test food",
                100,
                10,
                5,
                15,
                List.of(
                        new IngredientInfoRequest(1L, 5, UnitOfMeasure.GRAM),
                        new IngredientInfoRequest(1L, 2, UnitOfMeasure.UNIT)
                ),
                "Test recipe"
        );

        assertThrows(
                RuntimeException.class,
                () -> {foodService.addFood(foodRequest);},
                "can't add ingredients with same id"
        );
    }

    private FoodRequest getDefaultFood() {
        return new FoodRequest(
                DEFAULT_FOOD_NAME,
                DEFAULT_FOOD_CCAL,
                DEFAULT_FOOD_PROTEIN,
                DEFAULT_FOOD_FAT,
                DEFAULT_FOOD_CARBS,
                EMPTY_LIST,
                DEFAULT_RECIPE
        );
    }
}