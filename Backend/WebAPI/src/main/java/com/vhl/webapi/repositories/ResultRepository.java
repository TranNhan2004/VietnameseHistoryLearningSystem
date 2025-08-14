package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResultRepository extends JpaRepository<Result, String> {
    List<Result> findAllByLearner_Id(String learnerId);

    List<Result> findAllByContest_Id(String contestId);

    Optional<Result> findByLearner_IdAndContest_Id(String learnerId, String contestId);
}