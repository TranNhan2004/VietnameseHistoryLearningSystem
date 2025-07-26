package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.LearnerErrorCode;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class LearnerReqDTO extends BaseUserReqDTO {
    @Min(value = 0, message = LearnerErrorCode.BEST_SCORE__NOT_NEGATIVE)
    private Double bestScore;

    @Min(value = 0, message = LearnerErrorCode.WORST_SCORE__NOT_NEGATIVE)
    private Double worstScore;
}
