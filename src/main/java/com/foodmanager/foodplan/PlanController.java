package com.foodmanager.foodplan;

import com.foodmanager.models.Plan;
import com.foodmanager.models.PlanConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlanController {

    private PlanService planService;

    @Autowired
    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    @PostMapping("/plan")
    public Plan createPlan(@RequestBody PlanConfiguration configuration) {
        //TODO validate PlanConfiguration to match macros to ccal calculation
        return planService.createPlan(configuration);
    }
}
