package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.AnswerOptionErrorCode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateAnswerOptionReqDTO {
    private String id;

    @NotBlank(message = AnswerOptionErrorCode.CONTENT__REQUIRED)
    private String content;

    @NotNull(message = AnswerOptionErrorCode.CORRECT__REQUIRED)
    private Boolean correct;
}
