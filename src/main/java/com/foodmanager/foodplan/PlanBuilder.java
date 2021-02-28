package com.foodmanager.foodplan;

import com.foodmanager.models.DayPlan;
import com.foodmanager.models.Food;
import com.foodmanager.models.Macros;
import com.foodmanager.models.Plan;
import com.foodmanager.models.PlanConfiguration;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class PlanBuilder {

    final static int DEFAULT_MARGIN_OF_ERROR = 8;

    public static Plan createPlan(PlanConfiguration config, List<Food> foods) {
        int days = config.getDays();
        Macros macros = Optional.ofNullable(config.getRequirements())
                .orElse(defaultMarcos());
        int marginOfError = Optional.ofNullable(config.getMarginOfError())
                .orElse(DEFAULT_MARGIN_OF_ERROR);

        List<Food> allFoods = foods.stream()
                .sorted(Comparator.comparingInt(Food::getCcal))
                .collect(Collectors.toUnmodifiableList());
        int ccal = macros.getCcal();
        int protein = macros.getProtein();
        int fat = macros.getFat();
        int carbs = macros.getCarbs();

        List<DayPlan> dayToFoods = new ArrayList<>();
        for (int i = 1; i <= days; i++) {
            List<Food> dayFoods = createDayMenue(allFoods, ccal, protein, fat, carbs, marginOfError);
            DayPlan dayPlan = new DayPlan();
            dayPlan.setDay(i);
            dayPlan.setFoods(dayFoods);
            Macros dayMacros = new Macros();
            dayFoods.forEach(food -> {
                        //TODO no good, tbd later
                        int dayCarbs = dayMacros.getCarbs();
                        dayCarbs += food.getCarbs();
                        dayMacros.setCarbs(dayCarbs);

                        int dayFat = dayMacros.getFat();
                        dayFat += food.getFat();
                        dayMacros.setFat(dayFat);

                        int dayProtein = dayMacros.getProtein();
                        dayProtein += food.getProtein();
                        dayMacros.setProtein(dayProtein);

                        int dayCcal = dayMacros.getCcal();
                        dayCcal += food.getCcal();
                        dayMacros.setCcal(dayCcal);
                    });
            dayPlan.setDayStats(dayMacros);
            dayToFoods.add(dayPlan);
        }

        return new Plan(macros, dayToFoods);
    }

    private static Macros defaultMarcos() {
        int defaultCcal = 1500;
        int defaultCarbs = (int) (defaultCcal * 0.4 / 4);
        int defaultProtein = (int) (defaultCcal * 0.3 / 4);
        int defaultFat = (int) (defaultCcal * 0.3 / 9);

        return new Macros(defaultCcal, defaultProtein, defaultFat, defaultCarbs);
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
