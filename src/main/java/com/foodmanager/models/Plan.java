package com.foodmanager.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Plan {
    private Macros requirements;
    private Map<Integer, List<Food>> dayToFoods;
}
