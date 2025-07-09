package com.vhl.webapi.dtos.responses;

import lombok.Data;

@Data
public class AnswerOptionResDTO {
    private String id;
    private String content;
    private boolean isCorrect;
}
