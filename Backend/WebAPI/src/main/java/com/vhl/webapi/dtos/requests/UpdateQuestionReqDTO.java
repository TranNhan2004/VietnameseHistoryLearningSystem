package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.QuestionErrorCode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class UpdateQuestionReqDTO {
    @NotBlank(message = QuestionErrorCode.CONTENT__REQUIRED)
    private String content;

    private String lessonId;

    @NotNull(message = QuestionErrorCode.ANSWER_OPTIONS_REQ_DTOS__REQUIRED)
    @Size(min = 1, message = QuestionErrorCode.ANSWER_OPTIONS_REQ_DTOS__NOT_EMPTY)
    private List<UpdateAnswerOptionReqDTO> answerOptions;
}
