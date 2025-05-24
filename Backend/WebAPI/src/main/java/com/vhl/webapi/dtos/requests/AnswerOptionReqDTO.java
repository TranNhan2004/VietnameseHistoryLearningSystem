package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.AnswerOptionErrorCode;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AnswerOptionReqDTO {
    @NotBlank(message = AnswerOptionErrorCode.CONTENT__REQUIRED)
    private String content;

    @NotBlank(message = AnswerOptionErrorCode.IS_CORRECT__REQUIRED)
    private boolean isCorrect = false;

    @NotBlank(message = AnswerOptionErrorCode.QUESTION_ID__REQUIRED)
    private String questionId;
}
