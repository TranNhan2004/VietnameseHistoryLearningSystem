package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.ResultErrorCode;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ResultReqDTO {
    @NotNull(message = ResultErrorCode.START_TIME__REQUIRED)
    private LocalDateTime startTime;

    @NotNull(message = ResultErrorCode.END_TIME__REQUIRED)
    private LocalDateTime endTime;

    @NotNull(message = ResultErrorCode.CORRECT_ANSWER_NUMBER__REQUIRED)
    @Min(value = 0, message = ResultErrorCode.CORRECT_ANSWER_NUMBER__INVALID)
    private int correctAnswersNumber;

    @NotNull(message = ResultErrorCode.SCORE__REQUIRED)
    @Min(value = 0, message = ResultErrorCode.SCORE__INVALID)
    private double score;

    @NotBlank(message = ResultErrorCode.LEARNER_ID__REQUIRED)
    private String learnerId;

    @NotBlank(message = ResultErrorCode.CONTEST_ID__REQUIRED)
    private String contestId;

    @AssertTrue(message = ResultErrorCode.END_TIME__INVALID)
    public boolean isValidEndTime() {
        if (startTime == null || endTime == null) {
            return true;
        }

        return endTime.isAfter(startTime);
    }
}
