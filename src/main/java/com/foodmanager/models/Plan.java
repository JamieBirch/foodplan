package com.foodmanager.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Plan {
    private Macros requirements;
    private List<DayPlan> dayToFoods;
}
