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
public class FoodController {

    private FoodService foodService;

    @Autowired
    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @GetMapping("/food")
    public List<Food> getFoods() {
        return foodService.getFoods();
    }

    @PostMapping("/food")
    @Transactional
    public List<Food> addFood(@RequestBody FoodRequest food) {
        foodService.addFood(food);
        return foodService.getFoods();
    }

    @DeleteMapping("/food/{id}")
    @Transactional
    public List<Food> deleteFood(@PathVariable long id) {
        foodService.deleteFood(id);
        return foodService.getFoods();
    }

    @DeleteMapping("/food/all")
    @Transactional
    public List<Food> deleteFood() {
        foodService.deleteAllFoods();
        return foodService.getFoods();
    }


}
