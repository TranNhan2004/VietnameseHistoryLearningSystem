package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.ContestErrorCode;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ContestReqDTO {
    @NotNull(message = ContestErrorCode.QUESTION_NUMBER__REQUIRED)
    @Min(value = 1, message = ContestErrorCode.QUESTION_NUMBER__INVALID)
    private int questionNumber;

    @NotNull(message = ContestErrorCode.DURATION_IN_MINUTES__REQUIRED)
    @Min(value = 1, message = ContestErrorCode.DURATION_IN_MINUTES__INVALID)
    private int durationInMinutes;

    @NotNull(message = ContestErrorCode.START_TIME__REQUIRED)
    private LocalDateTime startTime;

    @NotNull(message = ContestErrorCode.END_TIME__REQUIRED)
    private LocalDateTime endTime;

    @AssertTrue(message = ContestErrorCode.END_TIME__INVALID)
    public boolean isValidEndTime() {
        return endTime.isAfter(startTime);
    }
}
