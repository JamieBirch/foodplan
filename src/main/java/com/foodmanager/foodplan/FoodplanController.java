package com.foodmanager.foodplan;

import com.foodmanager.models.Food;
import com.foodmanager.models.FoodRequest;
import com.foodmanager.models.Ingredient;
import com.foodmanager.models.IngredientRequest;
import com.foodmanager.models.Plan;
import com.foodmanager.models.PlanConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FoodplanController {

    private FoodplanService foodplanService;

    @Autowired
    public FoodplanController(FoodplanService foodplanService) {
        this.foodplanService = foodplanService;
    }

    @GetMapping("/food")
    public List<Food> getFoods() {
        return foodplanService.getFoods();
    }

    @PostMapping("/food")
    @Transactional
    public List<Food> addFood(@RequestBody FoodRequest food) {
        foodplanService.addFood(food);
        return foodplanService.getFoods();
    }

    @DeleteMapping("/food/{id}")
    @Transactional
    public List<Food> deleteFood(@PathVariable long id) {
        foodplanService.deleteFood(id);
        return foodplanService.getFoods();
    }

    @DeleteMapping("/food/all")
    @Transactional
    public List<Food> deleteFood() {
        foodplanService.deleteAllFoods();
        return foodplanService.getFoods();
    }

    @GetMapping("/ingredient")
    public List<Ingredient> getIngredients() {
        return foodplanService.getIngredients();
    }

    @PostMapping("/ingredient")
    @Transactional
    public List<Ingredient> addIngredient(@RequestBody IngredientRequest ingredient) {
        foodplanService.addIngredient(ingredient);
        return foodplanService.getIngredients();
    }

    @PostMapping("/ingredients")
    @Transactional
    public void addIngredients(@RequestBody List<IngredientRequest> ingredients) {
        foodplanService.addIngredients(ingredients);
    }

    @DeleteMapping("/ingredient/{id}")
    @Transactional
    public List<Ingredient> deleteIngredient(@PathVariable long id) {
        foodplanService.deleteIngredient(id);
        return foodplanService.getIngredients();
    }

    @PostMapping("/plan")
    public Plan createPlan(@RequestBody PlanConfiguration configuration) {
        return foodplanService.createPlan(configuration);
    }
}
