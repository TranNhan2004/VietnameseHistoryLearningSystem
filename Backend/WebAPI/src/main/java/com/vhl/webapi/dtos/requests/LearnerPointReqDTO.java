package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.LearnerErrorCode;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LearnerPointReqDTO {
    @NotNull(message = LearnerErrorCode.POINT__REQUIRED)
    @Min(value = 0, message = LearnerErrorCode.POINT__NOT_NEGATIVE)
    private Double addedPoint;
}
