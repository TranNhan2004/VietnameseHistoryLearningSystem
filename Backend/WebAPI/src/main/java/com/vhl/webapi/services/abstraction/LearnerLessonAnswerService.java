package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.LearnerLessonAnswerReqDTO;
import com.vhl.webapi.dtos.responses.LearnerLessonAnswerResDTO;

import java.util.List;

public interface LearnerLessonAnswerService {
    List<LearnerLessonAnswerResDTO> createBatch(List<LearnerLessonAnswerReqDTO> learnerLessonAnswerReqDTOS);

    List<LearnerLessonAnswerResDTO> getByLearnerAndLessonId(String learnerId, String lessonId);

    List<LearnerLessonAnswerResDTO> getByLearnerId(String learnerId);
}
