package com.foodmanager.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FoodRequest {

    private String name;

    private Integer ccal;
    private Integer protein;
    private Integer fat;
    private Integer carbs;

    private List<IngredientInfoRequest> ingredients;

    private String recipe;
}
