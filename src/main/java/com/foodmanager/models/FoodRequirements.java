package com.foodmanager.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class FoodRequirements {
    private int ccal;
    private int protein;
    private int fat;
    private int carbs;
    private int marginOfError;
}
