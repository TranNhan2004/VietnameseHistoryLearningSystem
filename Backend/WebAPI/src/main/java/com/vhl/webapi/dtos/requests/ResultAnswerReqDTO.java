package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.ResultAnswerErrorCode;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ResultAnswerReqDTO {
    @NotBlank(message = ResultAnswerErrorCode.RESULT_ID__REQUIRED)
    private String resultId;

    @NotBlank(message = ResultAnswerErrorCode.ANSWER_OPTION_ID__REQUIRED)
    private String answerOptionId;
}
