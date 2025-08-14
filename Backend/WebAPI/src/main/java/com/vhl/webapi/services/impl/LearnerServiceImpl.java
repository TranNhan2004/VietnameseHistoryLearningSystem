package com.vhl.webapi.services.impl;

import com.vhl.webapi.entities.specific.Learner;
import com.vhl.webapi.enums.LearnerRank;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.repositories.LearnerRepository;
import com.vhl.webapi.services.abstraction.LearnerService;
import com.vhl.webapi.utils.rank.LearnerRankUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LearnerServiceImpl implements LearnerService {
    private final LearnerRepository learnerRepository;

    @Override
    public void updatePointAndRank(String id, int addedPoint) {
        Learner learner = learnerRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(id));

        learner.setPoint(learner.getPoint() + addedPoint);
        learner.setRank(LearnerRank.valueOf(LearnerRankUtils.getLearnerRank(learner.getPoint())));
        learnerRepository.save(learner);
    }

    @Override
    public void updateScore(String id, double score) {
        Learner learner = learnerRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(id));

        if (learner.getBestScore() != null) {
            learner.setBestScore(Math.max(learner.getBestScore(), score));
        } else {
            learner.setBestScore(score);
        }

        if (learner.getWorstScore() != null) {
            learner.setWorstScore(Math.min(learner.getWorstScore(), score));
        } else {
            learner.setWorstScore(score);
        }

        learnerRepository.save(learner);
    }
}
