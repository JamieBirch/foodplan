package com.foodmanager.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class PlanConfiguration {
    private int days;
    private Macros requirements;
}
