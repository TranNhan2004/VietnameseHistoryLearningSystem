package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.StudyProgressErrorCode;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StudyProgressReqDTO {
    public Double progress;

    @NotBlank(message = StudyProgressErrorCode.LEARNER_ID__REQUIRED)
    public String learnerId;

    @NotBlank(message = StudyProgressErrorCode.LESSON_ID__REQUIRED)
    public String lessonId;
}
