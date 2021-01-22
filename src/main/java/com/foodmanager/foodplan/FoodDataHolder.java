package com.foodmanager.foodplan;

import com.foodmanager.models.Food;
import com.foodmanager.models.Ingredient;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class FoodDataHolder {
    private List<Food> foods;

/*    public FoodDataHolder() {
        //snacks
        Food protein_bar  = new Food(1L, "protein bar", 200, 50, 0, 0, Set.of(new Ingredient(1L, "protein bar", null)));
        Food half_protein_bar = new Food(2L, "half protein bar", 100, 25, 0, 0, Set.of(new Ingredient(2L,"half protein bar", null)));
        Food nuts = new Food(3L, "nuts", 180, 0, 20, 0, Set.of(new Ingredient(3L,"nuts", null)));
        Food half_nuts = new Food(4L, "half nuts", 90, 0, 10, 0, Set.of(new Ingredient(4L,"half nuts", null)));
        Food fruit = new Food(5L, "fruit", 200, 0, 0, 50, Set.of(new Ingredient(5L,"fruit", null)));
        Food half_fruit = new Food(6L, "half fruit", 100, 0, 0, 25, Set.of(new Ingredient(6L,"half fruit", null)));

        //meals
        Food meat = new Food(7L, "meat", 400, 100, 0, 0, Set.of(new Ingredient(7L,"meat", null)));
        Food half_meat = new Food(8L, "half meat", 200, 50, 0, 0, Set.of(new Ingredient(8L,"half meat", null)));
        Food cheese = new Food(9L, "cheese", 900, 0, 100, 0, Set.of(new Ingredient(9L,"cheese", null)));
        Food half_cheese = new Food(10L, "half cheese", 450, 0, 50, 0, Set.of(new Ingredient(10L,"half cheese", null)));
        Food desert = new Food(11L, "desert", 400, 0, 0, 100, Set.of(new Ingredient(11L,"desert", null)));
        Food half_desert = new Food(12L, "half desert", 200, 0, 0, 50, Set.of(new Ingredient(12L,"half desert", null)));
        Food balanced_meal = new Food(13L, "balanced meal", 250, 20, 10, 20, Set.of(new Ingredient(13L,"balanced meal", null)));

        List<Food> foods = List.of(
                protein_bar,
                half_protein_bar,
                nuts,
                half_nuts,
                fruit,
                half_fruit,
                meat,
                half_meat,
                cheese,
                half_cheese,
                desert,
                half_desert,
                balanced_meal
        );
    }*/
}
