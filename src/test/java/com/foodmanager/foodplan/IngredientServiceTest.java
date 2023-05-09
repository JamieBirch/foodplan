package com.foodmanager.foodplan;

import com.foodmanager.models.Ingredient;
import com.foodmanager.models.IngredientRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
public class IngredientServiceTest {
    private IngredientService ingredientService;
    private IngredientRepository ingredientRepository;

    private static final String DEFAULT_INGREDIENT_NAME = "Test ingredient";


    @Autowired
    public IngredientServiceTest(IngredientService ingredientService, IngredientRepository ingredientRepository) {
        this.ingredientService = ingredientService;
        this.ingredientRepository = ingredientRepository;
    }

    @Test
    @Transactional
    @DirtiesContext
    void addIngredientTest() {
        IngredientRequest ingredientRequest = getDefaultIngredient();

        Ingredient savedIngredient = ingredientService.addIngredient(ingredientRequest);

        assertThat(ingredientRepository.count()).isEqualTo(1);
        assertThat(savedIngredient.getName()).isEqualTo(DEFAULT_INGREDIENT_NAME);
    }

    @Test
    @Transactional
    @DirtiesContext
    void addSeveralIngredientsTest() {
        IngredientRequest ingredientRequestA = new IngredientRequest("A");
        IngredientRequest ingredientRequestB = new IngredientRequest("B");
        IngredientRequest ingredientRequestC = new IngredientRequest("C");

        List<Ingredient> savedIngredients = ingredientService.addIngredients(
                List.of(ingredientRequestA, ingredientRequestB, ingredientRequestC)
                );

        assertThat(ingredientRepository.count()).isEqualTo(3);
        assertThat(savedIngredients.size()).isEqualTo(3);
    }

    @Test
    @Transactional
    @DirtiesContext
    void deleteIngredientTest() {
        IngredientRequest ingredientRequest = getDefaultIngredient();

        Ingredient savedIngredient = ingredientService.addIngredient(ingredientRequest);
        assertThat(ingredientRepository.count()).isEqualTo(1);

        ingredientService.deleteIngredient(savedIngredient.getId());
        assertThat(ingredientRepository.count()).isEqualTo(0);
    }

    private static IngredientRequest getDefaultIngredient() {
        return new IngredientRequest(DEFAULT_INGREDIENT_NAME);
    }
}
