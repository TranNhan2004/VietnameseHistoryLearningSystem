package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.LearnerErrorCode;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LearnerPointReqDTO {
    @NotNull(message = LearnerErrorCode.ADDED_POINT_REQUIRED)
    @Min(value = 0, message = LearnerErrorCode.ADDED_POINT_NOT_NEGATIVE)
    private double addedPoint;
}
