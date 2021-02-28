package com.foodmanager.foodplan;

import com.foodmanager.models.Food;
import com.foodmanager.models.Macros;
import com.foodmanager.models.Plan;
import com.foodmanager.models.PlanConfiguration;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class PlanBuilder {

    public static Plan createPlan(PlanConfiguration config, List<Food> foods) {
        int days = config.getDays();
        Macros macros = Optional.ofNullable(config.getRequirements())
                .orElse(defaultMarcos());

        List<Food> allFoods = foods.stream()
                .sorted(Comparator.comparingInt(Food::getCcal))
                .collect(Collectors.toUnmodifiableList());
//        Macros requirements = config.getRequirements();
        int ccal = macros.getCcal();
        int protein = macros.getProtein();
        int fat = macros.getFat();
        int carbs = macros.getCarbs();
        int marginOfError = macros.getMarginOfError();

        Map<Integer, List<Food>> dayToFoods = new HashMap<>();
        for (int i = 1; i <= days; i++) {
            List<Food> dayFoods = createDayMenue(allFoods, ccal, protein, fat, carbs, marginOfError);
            dayToFoods.put(i, dayFoods);
        }

        return new Plan(macros, dayToFoods);
    }

    private static Macros defaultMarcos() {
        int defaultCcal = 1500;
        int defaultCarbs = (int) (defaultCcal * 0.4 / 4);
        int defaultProtein = (int) (defaultCcal * 0.3 / 4);
        int defaultFat = (int) (defaultCcal * 0.3 / 9);
        int defaultMarginOfError = 8;

        return new Macros(defaultCcal, defaultProtein, defaultFat, defaultCarbs, defaultMarginOfError);
    }

    private static List<Food> createDayMenue(List<Food> allFoods, int expectedCcalSum, int expectedProteinSum, int expectedFatSum, int expectedCarbsSum, int marginOfError) {
        List<Food> possibleFoods = new ArrayList<>(allFoods);
        List<Food> foods = new ArrayList<>();

        int maxCcal = (expectedCcalSum * (100 + marginOfError)/100);
        int minCcal = (expectedCcalSum * (100 - marginOfError)/100);
        int margin = maxCcal - minCcal;
        AtomicInteger remainingCcal = new AtomicInteger(minCcal);
        while (remainingCcal.getPlain() > 0) {
            //find next food to add
            List<Food> filteredFoods = possibleFoods.stream()
                    .filter(food -> food.getCcal() < remainingCcal.get() + margin)
                    //+other conditions

                    .collect(Collectors.toList());

            Optional<Food> randomFoodIfPresent = filteredFoods.stream()
                    .skip((int) (filteredFoods.size() * Math.random()))
                    .findAny();

            randomFoodIfPresent.ifPresentOrElse(
                    food -> {
                        foods.add(food);
                        remainingCcal.addAndGet(-food.getCcal());
                        possibleFoods.remove(food);
                    },
                    () -> {
//                        int lastElIndex = foods.size() - 1;
                        Food removedFood = foods.remove((int) (foods.size() * Math.random()));
                        remainingCcal.addAndGet(removedFood.getCcal());
                        possibleFoods.add(removedFood);
                    }
            );
        }

        return foods;
    }
}
