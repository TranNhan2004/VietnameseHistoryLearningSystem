package com.vhl.webapi.dtos.responses;

import lombok.Data;

import java.util.List;

@Data
public class QuestionResDTO {
    private String id;
    private String content;
    private String lessonId;
    private List<AnswerOptionResDTO> answerOptions;
}
