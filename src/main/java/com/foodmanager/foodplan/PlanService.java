package com.foodmanager.foodplan;

import com.foodmanager.models.Food;
import com.foodmanager.models.Plan;
import com.foodmanager.models.PlanConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanService {

    private FoodRepository foodRepository;

    @Autowired
    public PlanService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    public Plan createPlan(PlanConfiguration configuration) {
        List<Food> allFoods = foodRepository.findAll();
        return PlanBuilder.createPlan(configuration, allFoods);
    }
}
