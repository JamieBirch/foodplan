package com.foodmanager.foodplan;

import com.foodmanager.models.Food;
import com.foodmanager.models.FoodRequest;
import com.foodmanager.models.Ingredient;
import com.foodmanager.models.IngredientRequest;
import com.foodmanager.models.Plan;
import com.foodmanager.models.PlanConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.foodmanager.foodplan.PlanBuilder.createPlan;

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
    public void addFood(@RequestBody FoodRequest food) {
        foodplanService.addFood(food);
    }

    @GetMapping("/ingredient")
    public List<Ingredient> getIngredients() {
        return foodplanService.getIngredients();
    }

    @PostMapping("/ingredient")
    @Transactional
    public void addIngredient(@RequestBody IngredientRequest ingredient) {
        foodplanService.addIngredient(ingredient);
    }

    /*@PostMapping("/configurate")
    public void configurate(@RequestBody PlanConfiguration configuration) {
        config = configuration;
    }*/

    @GetMapping("/plan")
    public Plan getPlan(@RequestBody PlanConfiguration configuration) {
        return createPlan(configuration);
    }
}
