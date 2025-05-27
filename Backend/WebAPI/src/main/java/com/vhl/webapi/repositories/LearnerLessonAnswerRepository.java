package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.LearnerLessonAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearnerLessonAnswerRepository extends JpaRepository<LearnerLessonAnswer, String> {

}