package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.FavoriteLessonErrorCode;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FavoriteLessonReqDTO {
    @NotBlank(message = FavoriteLessonErrorCode.LEARNER_ID__REQUIRED)
    private String learnerId;

    @NotBlank(message = FavoriteLessonErrorCode.LESSON_ID__REQUIRED)
    private String lessonId;
}
