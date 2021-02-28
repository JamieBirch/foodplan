package com.foodmanager.foodplan;

import com.foodmanager.models.Ingredient;
import com.foodmanager.models.IngredientRequest;
import org.springframework.stereotype.Service;

@Service
public class MappingService {
    public Ingredient ingredientRequestToIngredient(IngredientRequest ingredientRequest) {
        Ingredient ingredient = new Ingredient();
        ingredient.setName(ingredientRequest.getName());
        return ingredient;
    }
}
