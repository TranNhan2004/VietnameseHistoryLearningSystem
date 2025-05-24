package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.ContestQuestionErrorCode;
import com.vhl.webapi.constants.regexps.ContestQuestionRegExp;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class ContestQuestionReqDTO {
    @NotNull(message = ContestQuestionErrorCode.POINT__REQUIRED)
    @Min(value = 0, message = ContestQuestionErrorCode.POINT__INVALID)
    private double point;

    @NotBlank(message = ContestQuestionErrorCode.POINT_ALLOCATION_RULE__REQUIRED)
    @Pattern(
        regexp = ContestQuestionRegExp.POINT_ALLOCATION_RULE,
        message = ContestQuestionErrorCode.POINT_ALLOCATION_RULE__INVALID
    )
    private String pointAllocationRule;

    @NotBlank(message = ContestQuestionErrorCode.CONTEST_ID__REQUIRED)
    private String contestId;

    @NotBlank(message = ContestQuestionErrorCode.QUESTION_ID__REQUIRED)
    private String questionId;
}
