package com.vhl.webapi.utils.rank;

import com.vhl.webapi.enums.LearnerRank;

public class LearnerRankUtils {
    public static String getLearnerRank(Integer points) {
        if (points < 300) {
            return LearnerRank.BEGINNER.name();
        }

        if (points < 600) {
            return LearnerRank.INTERMEDIATE.name();
        }

        if (points < 1200) {
            return LearnerRank.ADVANCED.name();
        }

        return LearnerRank.EXPERT.name();
    }
}
