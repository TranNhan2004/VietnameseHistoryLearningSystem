package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.LessonErrorCode;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LessonReqDTO {
    @NotBlank(message = LessonErrorCode.TITLE__REQUIRED)
    @Size(max = 1024, message = LessonErrorCode.TITLE__TOO_LONG)
    private String title;

    @Size(max = 2048, message = LessonErrorCode.VIDEO_URL__TOO_LONG)
    private String videoUrl;

    @NotNull(message = LessonErrorCode.LIKES__REQUIRED)
    @Min(value = 0, message = LessonErrorCode.LIKES__INVALID)
    private int likes = 0;

    @NotNull(message = LessonErrorCode.VIEWS__REQUIRED)
    @Min(value = 0, message = LessonErrorCode.VIEWS__INVALID)
    private int views = 0;

    @Size(max = 1024, message = LessonErrorCode.DESCRIPTION__TOO_LONG)
    private String description;

    @NotBlank(message = LessonErrorCode.HISTORIAL_PERIOD_ID__REQUIRED)
    private String historicalPeriodId;

    private String adminId;
}
