package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.LearnerLessonAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearnerLessonAnswerRepository extends JpaRepository<LearnerLessonAnswer, String> {
    List<LearnerLessonAnswer> findAllByLearner_IdAndLesson_Id(String learnerId, String lessonId);

    List<LearnerLessonAnswer> findAllByLearner_Id(String learnerId);
}