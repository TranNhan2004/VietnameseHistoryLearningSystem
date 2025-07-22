package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.ContestErrorCode;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ContestReqDTO {
    @NotBlank(message = ContestErrorCode.NAME__REQUIRED)
    @Size(min = 1, max = 512, message = ContestErrorCode.NAME__TOO_LONG)
    private String name;

    @NotNull(message = ContestErrorCode.QUESTION_NUMBER__REQUIRED)
    @Min(value = 1, message = ContestErrorCode.QUESTION_NUMBER__INVALID)
    private Integer questionNumber;

    @NotNull(message = ContestErrorCode.DURATION_IN_MINUTES__REQUIRED)
    @Min(value = 10, message = ContestErrorCode.DURATION_IN_MINUTES__INVALID)
    private Integer durationInMinutes;
    
    @NotNull(message = ContestErrorCode.START_TIME__REQUIRED)
    private LocalDateTime startTime;

    @NotNull(message = ContestErrorCode.END_TIME__REQUIRED)
    private LocalDateTime endTime;

    @AssertTrue(message = ContestErrorCode.END_TIME__INVALID)
    public boolean isValidEndTime() {
        return endTime.isAfter(startTime);
    }
}
