package com.foodmanager.foodplan;

import com.foodmanager.models.Food;
import com.foodmanager.models.FoodRequest;
import com.foodmanager.models.Ingredient;
import com.foodmanager.models.IngredientInfo;
import com.foodmanager.models.IngredientRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodplanService {

    private FoodRepository foodRepository;
    private IngredientRepository ingredientRepository;

    @Autowired
    public FoodplanService(FoodRepository foodRepository, IngredientRepository ingredientRepository) {
        this.foodRepository = foodRepository;
        this.ingredientRepository = ingredientRepository;
    }

    public List<Food> getFoods() {
        return foodRepository.findAll();
    }

    @Transactional
    public void addFood(FoodRequest foodRequest) {
        //mappingService
        Food food = new Food();
        food.setName(foodRequest.getName());
        food.setCcal(foodRequest.getCcal());
        food.setCarbs(foodRequest.getCarbs());
        food.setFat(foodRequest.getFat());
        food.setProtein(foodRequest.getProtein());
        food.setRecipe(foodRequest.getRecipe());

        List<IngredientInfo> ingredients = foodRequest.getIngredients().stream()
                .map(ingredient -> {
                    IngredientInfo ingredientInfo = new IngredientInfo();
                    ingredientInfo.setFood(food);
                    ingredientInfo.setHowMuch(ingredient.getHowMuch());
                    ingredientInfo.setUom(ingredient.getUom());
                    Long ingredientId = ingredient.getIngredient();
                    Ingredient dbIngredient = ingredientRepository.findById(ingredientId)
                            .orElseThrow(() -> new RuntimeException(String.format("can't find ingredient with id %d", ingredientId)));
                    ingredientInfo.setIngredient(dbIngredient);
                    return ingredientInfo;
                })
                .collect(Collectors.toList());

        food.setIngredients(ingredients);
        foodRepository.save(food);
    }

    public List<Ingredient> getIngredients() {
        return ingredientRepository.findAll();
    }

    @Transactional
    public void addIngredient(IngredientRequest ingredientRequest) {
        Ingredient ingredient = new Ingredient();
        ingredient.setName(ingredientRequest.getName());
        ingredientRepository.save(ingredient);
    }
}
