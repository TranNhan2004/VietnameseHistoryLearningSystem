package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.LessonErrorCode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LessonReqDTO {
    @NotBlank(message = LessonErrorCode.TITLE__REQUIRED)
    @Size(max = 1024, message = LessonErrorCode.TITLE__TOO_LONG)
    private String title;

    @NotBlank(message = LessonErrorCode.DESCRIPTION__REQUIRED)
    @Size(max = 2048, message = LessonErrorCode.DESCRIPTION__TOO_LONG)
    private String description;

    @NotBlank(message = LessonErrorCode.HISTORIAL_PERIOD_ID__REQUIRED)
    private String historicalPeriodId;

    private String adminId;
}
