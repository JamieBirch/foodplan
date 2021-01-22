package com.foodmanager.foodplan;

import com.foodmanager.models.Food;
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

//    private PlanConfiguration config;

    private FoodRepository foodRepository;

    @Autowired
    public FoodplanController(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    @GetMapping("/allFoods")
    public List<Food> getAll() {
        //to service
        return foodRepository.findAll();
    }

    @PostMapping("/addFood")
    @Transactional
    public void addFood(@RequestBody Food food) {
        //to service
        //transactional
        foodRepository.save(food);
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
