package com.foodmanager.foodplan;

import com.foodmanager.models.Ingredient;
import com.foodmanager.models.IngredientRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class IngredientController {

    private IngredientService ingredientService;

    @Autowired
    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @GetMapping("/ingredient")
    public List<Ingredient> getIngredients() {
        return ingredientService.getIngredients();
    }

    @PostMapping("/ingredient")
    @Transactional
    public List<Ingredient> addIngredient(@RequestBody IngredientRequest ingredient) {
        ingredientService.addIngredient(ingredient);
        return ingredientService.getIngredients();
    }

    @PostMapping("/ingredients")
    @Transactional
    public void addIngredients(@RequestBody List<IngredientRequest> ingredients) {
        ingredientService.addIngredients(ingredients);
    }

    @DeleteMapping("/ingredient/{id}")
    @Transactional
    public List<Ingredient> deleteIngredient(@PathVariable long id) {
        ingredientService.deleteIngredient(id);
        return ingredientService.getIngredients();
    }

}
