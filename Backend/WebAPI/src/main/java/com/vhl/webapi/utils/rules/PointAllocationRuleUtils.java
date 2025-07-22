package com.vhl.webapi.utils.rules;

import java.util.HashMap;
import java.util.Map;

public class PointAllocationRuleUtils {
    public static double getPoint(double originalPoint, int numberCorrect, String pointAllocationRule) {
        if (pointAllocationRule == null || pointAllocationRule.isBlank()) return 0;

        Map<Integer, Integer> rulesMap = new HashMap<>();
        String[] rules = pointAllocationRule.split("-");

        for (String rule : rules) {
            String[] parts = rule.split(":", 2);
            if (parts.length != 2) continue;

            try {
                int correct = Integer.parseInt(parts[0].trim());
                int percent = Integer.parseInt(parts[1].trim());
                rulesMap.put(correct, percent);
            } catch (NumberFormatException e) {
            }
        }

        Integer percent = rulesMap.get(numberCorrect);
        if (percent == null) return 0;

        return (percent / 100.0) * originalPoint;
    }


}
