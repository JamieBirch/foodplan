package com.foodmanager.foodplan;

import com.foodmanager.models.Macros;

public final class MacrosCalculator {

    private MacrosCalculator() {}

    public static int macrosToCcal(int protein, int fat, int carbs) {
        return protein * 4 + fat * 9 + carbs * 4;
    }

    public static boolean macrosMatchCcal(Macros requirements) {
        return macrosToCcal(requirements.getProtein(), requirements.getFat(), requirements.getCarbs()) == requirements.getCcal();
    }
}
