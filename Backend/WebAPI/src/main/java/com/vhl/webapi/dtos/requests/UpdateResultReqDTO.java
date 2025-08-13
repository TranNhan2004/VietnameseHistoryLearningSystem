package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.ResultErrorCode;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UpdateResultReqDTO {
    @NotNull(message = ResultErrorCode.END_TIME__REQUIRED)
    private LocalDateTime endTime;
}
