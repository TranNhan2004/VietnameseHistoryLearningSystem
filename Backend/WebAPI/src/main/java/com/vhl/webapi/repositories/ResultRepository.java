package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResultRepository extends JpaRepository<Result, String> {
    List<Result> findAllByLearner_Id(String learnerId);

    List<Result> findAllByContest_Id(String contestId);

    @Query("SELECT r FROM Result r WHERE r.learner.id = :learnerId AND r.contest.id = :contestId")
    Optional<Result> findByLearnerAndContest(
        @Param("learnerId") String learnerId,
        @Param("contestId") String contestId
    );
}