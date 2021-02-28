package com.foodmanager.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Macros {
    private int ccal;
    private int protein;
    private int fat;
    private int carbs;
}
