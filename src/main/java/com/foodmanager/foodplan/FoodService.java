package com.foodmanager.foodplan;

import com.foodmanager.models.Food;
import com.foodmanager.models.FoodRequest;
import com.foodmanager.models.Ingredient;
import com.foodmanager.models.IngredientInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodService {

    private FoodRepository foodRepository;

    private IngredientRepository ingredientRepository;

    @Autowired
    public FoodService(FoodRepository foodRepository, IngredientRepository ingredientRepository) {
        this.foodRepository = foodRepository;
        this.ingredientRepository = ingredientRepository;
    }

    public List<Food> getFoods() {
        return foodRepository.findAll();
    }

    @Transactional
    public Food addFood(FoodRequest foodRequest) {
        //mappingService
        Food food = new Food();
        food.setName(foodRequest.getName());
        food.setCcal(foodRequest.getCcal());
        food.setCarbs(foodRequest.getCarbs());
        food.setFat(foodRequest.getFat());
        food.setProtein(foodRequest.getProtein());
        food.setRecipe(foodRequest.getRecipe());

        List<IngredientInfo> ingredients = Optional.ofNullable(foodRequest.getIngredients()).stream().flatMap(Collection::stream)
                .map(ingredient -> {
                    IngredientInfo ingredientInfo = new IngredientInfo();
                    ingredientInfo.setFood(food);
                    ingredientInfo.setHowMuch(ingredient.getHowMuch());
                    ingredientInfo.setUom(ingredient.getUom());
                    Long ingredientId = ingredient.getId();
                    Ingredient dbIngredient = ingredientRepository.findById(ingredientId)
                            .orElseThrow(() -> new RuntimeException(String.format("can't find ingredient with id %d", ingredientId)));
                    ingredientInfo.setIngredient(dbIngredient);
                    return ingredientInfo;
                })
                .collect(Collectors.toList());
        food.setIngredients(ingredients);

        return foodRepository.save(food);
    }

    @Transactional
    public void deleteFood(long id) {
        foodRepository.deleteById(id);
    }

    @Transactional
    public void deleteAllFoods() {
        foodRepository.deleteAll();
    }
}
