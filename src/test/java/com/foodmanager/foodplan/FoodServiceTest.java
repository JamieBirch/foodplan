package com.foodmanager.foodplan;

import com.foodmanager.models.FoodRequest;
import com.foodmanager.models.IngredientInfoRequest;
import com.foodmanager.models.UnitOfMeasure;
import org.junit.jupiter.api.BeforeAll;
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
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class FoodServiceTest {
    @Autowired
    private FoodService foodService;

    @Autowired
    private FoodRepository foodRepository;
    private final String DEFAULT_FOOD_NAME = "Test food";
    private final int DEFAULT_FOOD_CCAL = 100;
    private final int DEFAULT_FOOD_PROTEIN = 10;
    private final int DEFAULT_FOOD_FAT = 5;
    private final int DEFAULT_FOOD_CARBS = 15;
    private final String DEFAULT_RECIPE = "Test recipe";

    @BeforeAll
    static void init() {
        //TODO fill in Ingredients table
    }

    @Test
    @Transactional
    @DirtiesContext
    void addFoodNoIngredientsTest() {
        FoodRequest foodRequest = getDefaultFood();

        foodService.addFood(foodRequest);

        assertThat(foodRepository.count()).isEqualTo(1);
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

    @Test
    @Transactional
    @DirtiesContext
    void addFoodNonExistentIngredientTest() {
        FoodRequest foodRequest = new FoodRequest(
                "Test food",
                100,
                10,
                5,
                15,
                List.of(
                        new IngredientInfoRequest(999L, 5, UnitOfMeasure.GRAM)
                ),
                "Test recipe"
        );

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

}