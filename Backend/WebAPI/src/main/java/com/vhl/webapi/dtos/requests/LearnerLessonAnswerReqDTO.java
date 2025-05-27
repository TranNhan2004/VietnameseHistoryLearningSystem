package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.LearnerLessonAnswerErrorCode;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LearnerLessonAnswerReqDTO {
    @NotBlank(message = LearnerLessonAnswerErrorCode.LEARNER_ID__REQUIRED)
    private String learnerId;

    @NotBlank(message = LearnerLessonAnswerErrorCode.LESSON_ID__REQUIRED)
    private String lessonId;

    @NotBlank(message = LearnerLessonAnswerErrorCode.ANSWER_OPTION_ID__REQUIRED)
    private String answerOptionId;
}
