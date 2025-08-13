package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.ResultErrorCode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ResultReqDTO {
    @NotNull(message = ResultErrorCode.START_TIME__REQUIRED)
    private LocalDateTime startTime;

    @NotBlank(message = ResultErrorCode.LEARNER_ID__REQUIRED)
    private String learnerId;

    @NotBlank(message = ResultErrorCode.CONTEST_ID__REQUIRED)
    private String contestId;
}
