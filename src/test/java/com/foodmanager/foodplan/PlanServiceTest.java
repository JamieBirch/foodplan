package com.foodmanager.foodplan;

import com.foodmanager.models.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
public class PlanServiceTest {
    private FoodRepository foodRepository;
    private PlanService planService;

    @Autowired
    public PlanServiceTest(FoodRepository foodRepository, PlanService planService) {
        this.foodRepository = foodRepository;
        this.planService = planService;
        propagateFoodRepository();
    }

    void propagateFoodRepository() {

        Food food1 = new Food(1L, "Test Food1", 1000, 50, 20, 30, Collections.emptyList(), "recipe 1");
        Food food2 = new Food(2L, "Test Food2", 500, 20, 10, 20, Collections.emptyList(), "recipe 2");
        Food food3 = new Food(3L, "Test Food3", 200, 10, 5, 10, Collections.emptyList(), "recipe 3");
        Food food4 = new Food(4L, "Test Food4", 100, 5, 5, 5, Collections.emptyList(), "recipe 4");
        Food food5 = new Food(5L, "Test Food5", 100, 5, 5, 5, Collections.emptyList(), "recipe 5");
        Food food6 = new Food(6L, "Test Food6", 100, 5, 5, 5, Collections.emptyList(), "recipe 6");

        foodRepository.saveAll(List.of(
                food1,
                food2,
                food3,
                food4,
                food5,
                food6
        ));
    }

    @Test
    @Transactional
    @DirtiesContext
    void testCreatePlan() {
        int requirementCcal = 1700;
        Macros requirementMacros = new Macros(requirementCcal, 60, 15, 70);
        int marginOfError = 20;
        PlanConfiguration configuration = new PlanConfiguration(1, requirementMacros, marginOfError);

        Plan plan = planService.createPlan(configuration);

        plan.getDayToFoods().stream().map(DayPlan::getDayStats).forEach(dayMacros -> {
            assertThat(dayMacros.getCcal()).isBetween(requirementCcal * (100-marginOfError)/100, requirementCcal * (100+marginOfError)/100);
        });

    }
}
