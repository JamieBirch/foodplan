package com.foodmanager.foodplan;

import com.foodmanager.models.Food;
import com.foodmanager.models.Macros;
import com.foodmanager.models.Plan;
import com.foodmanager.models.PlanConfiguration;
import org.junit.jupiter.api.Test;
import org.springframework.util.Assert;

import static com.foodmanager.foodplan.PlanBuilder.createPlan;

class PlanBuilderTest {

    @Test
    void testCreatePlan() {
        /*int targetCcal = 1300;
        int targetProtein = 90;
        int targetFat = 60;
        int targetCarbs = 100;
        int marginOfError = 8;
        Macros macros = new Macros(targetCcal, targetProtein, targetFat, targetCarbs, marginOfError);
        int expDays = 3;
        PlanConfiguration planConfiguration = new PlanConfiguration(expDays, macros);
        Plan plan = createPlan(planConfiguration, allFoods);
        int actualDays = plan.getDayToFoods().entrySet().size();
        Assert.isTrue(actualDays == expDays, "number of days should be equal");
        plan.getDayToFoods().values()
                .forEach(dayFoods -> {
                            int ccal = dayFoods.stream()
                                    .mapToInt(Food::getCcal)
                                    .sum();
                            Assert.isTrue(ccal <= targetCcal * (100 + marginOfError)/100, "number of ccal should be equal");
                            Assert.isTrue(ccal >= targetCcal * (100 - marginOfError)/100, "number of ccal should be equal");

                            *//*int protein = dayFoods.stream()
                                    .mapToInt(Food::getProtein)
                                    .sum();
                            Assert.isTrue(protein == targetProtein, "number of protein should be equal");

                            int fat = dayFoods.stream()
                                    .mapToInt(Food::getFat)
                                    .sum();
                            Assert.isTrue(fat == targetFat, "number of fat should be equal");

                            int carbs = dayFoods.stream()
                                    .mapToInt(Food::getCarbs)
                                    .sum();
                            Assert.isTrue(carbs == targetCarbs, "number of carbs should be equal");*//*

                        }
                );*/

    }
}