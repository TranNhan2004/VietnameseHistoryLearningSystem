package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.LearnerErrorCode;
import com.vhl.webapi.enums.LearnerRank;
import com.vhl.webapi.utils.annotations.validation.ValidEnum;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LearnerReqDTO extends BaseUserReqDTO {
    @NotNull(message = LearnerErrorCode.RANK_REQUIRED)
    @ValidEnum(enumClass = LearnerRank.class, message = LearnerErrorCode.RANK_INVALID)
    private String rank;

    @NotNull(message = LearnerErrorCode.POINT_REQUIRED)
    @Min(value = 0, message = LearnerErrorCode.POINT_NOT_NEGATIVE)
    private int point = 0;

    @Min(value = 0, message = LearnerErrorCode.BEST_SCORE_NOT_NEGATIVE)
    private Double bestScore;

    @Min(value = 0, message = LearnerErrorCode.WORST_SCORE_NOT_NEGATIVE)
    private Double worstScore;
}
