package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.QuestionErrorCode;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class QuestionReqDTO {
    @NotBlank(message = QuestionErrorCode.CONTENT__REQUIRED)
    private String content;

    private String lessonId;

}
