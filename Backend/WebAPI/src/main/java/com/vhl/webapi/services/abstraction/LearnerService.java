package com.vhl.webapi.services.abstraction;

public interface LearnerService {
    void updatePointAndRank(String id, int addedPoint);

    void updateScore(String id, double score);
}
