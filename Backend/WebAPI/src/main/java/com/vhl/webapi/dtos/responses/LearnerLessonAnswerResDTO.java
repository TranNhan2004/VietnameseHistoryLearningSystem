package com.vhl.webapi.dtos.responses;

import lombok.Data;

@Data
public class LearnerLessonAnswerResDTO {
    private String id;
    private String learnerId;
    private String lessonId;
    private String answerOptionId;
}
