package com.foodmanager.foodplan;

import com.foodmanager.models.Food;
import com.foodmanager.models.Ingredient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Random;
import java.util.Set;

@Component
public class DatabaseSeeder implements CommandLineRunner {
    private FoodRepository foodRepository;

    @Autowired
    public DatabaseSeeder(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    @Override
    public void run(String... args) throws Exception {

/*//        Food protein_bar  = new Food(1L, "protein bar", 200, 50, 0, 0, Set.of(new Ingredient(1L, "protein bar", null)));
        Food protein_bar  = createFood(1L, "protein bar", 200, 50, 0, 0, "protein bar");
//        Food half_protein_bar = new Food(2L, "half protein bar", 100, 25, 0, 0, Set.of(new Ingredient(2L,"half protein bar", null)));
        Food half_protein_bar = createFood(2L, "half protein bar", 100, 25, 0, 0, "half protein bar");
//        Food nuts = new Food(3L, "nuts", 180, 0, 20, 0, Set.of(new Ingredient(3L,"nuts", null)));
        Food nuts = createFood(3L, "nuts", 180, 0, 20, 0, "nuts");
//        Food half_nuts = new Food(4L, "half nuts", 90, 0, 10, 0, Set.of(new Ingredient(4L,"half nuts", null)));
        Food half_nuts = createFood(4L, "half nuts", 90, 0, 10, 0, "half nuts");
//        Food fruit = new Food(5L, "fruit", 200, 0, 0, 50, Set.of(new Ingredient(5L,"fruit", null)));
        Food fruit = createFood(5L, "fruit", 200, 0, 0, 50, "fruit");
//        Food half_fruit = new Food(6L, "half fruit", 100, 0, 0, 25, Set.of(new Ingredient(6L,"half fruit", null)));
        Food half_fruit = createFood(6L, "half fruit", 100, 0, 0, 25, "half fruit");

        //meals
//        Food meat = new Food(7L, "meat", 400, 100, 0, 0, Set.of(new Ingredient(7L,"meat", null)));
        Food meat = createFood(7L, "meat", 400, 100, 0, 0, "meat");
//        Food half_meat = new Food(8L, "half meat", 200, 50, 0, 0, Set.of(new Ingredient(8L,"half meat", null)));
        Food half_meat = createFood(8L, "half meat", 200, 50, 0, 0, "half meat");
//        Food cheese = new Food(9L, "cheese", 900, 0, 100, 0, Set.of(new Ingredient(9L,"cheese", null)));
        Food cheese = createFood(9L, "cheese", 900, 0, 100, 0, "cheese");
//        Food half_cheese = new Food(10L, "half cheese", 450, 0, 50, 0, Set.of(new Ingredient(10L,"half cheese", null)));
        Food half_cheese = createFood(10L, "half cheese", 450, 0, 50, 0, "half cheese");
//        Food desert = new Food(11L, "desert", 400, 0, 0, 100, Set.of(new Ingredient(11L,"desert", null)));
        Food desert = createFood(11L, "desert", 400, 0, 0, 100, "desert");
//        Food half_desert = new Food(12L, "half desert", 200, 0, 0, 50, Set.of(new Ingredient(12L,"half desert", null)));
        Food half_desert = createFood(12L, "half desert", 200, 0, 0, 50, "half desert");
//        Food balanced_meal = new Food(13L, "balanced meal", 250, 20, 10, 20, Set.of(new Ingredient(13L,"balanced meal", null)));
        Food balanced_meal = createFood(13L, "balanced meal", 250, 20, 10, 20, "balanced meal");

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

        foodRepository.saveAll(foods);*/
    }

    /*private Food createFood(Long id, String name, int ccal, int protein, int fat, int carbs, String ingredient) {
        Ingredient newIngredient = new Ingredient(new Random().nextLong(), ingredient, null);
        Food food = new Food(id, name, ccal, protein, fat, carbs, Set.of(newIngredient));
        newIngredient.setFoods(Set.of(food));
        return food;
    }*/
}
