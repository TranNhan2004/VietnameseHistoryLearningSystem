package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.LearnerContestAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearnerContestAnswerRepository extends JpaRepository<LearnerContestAnswer, String> {

}