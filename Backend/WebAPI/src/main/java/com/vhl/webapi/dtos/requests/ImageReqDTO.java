package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.ImageErrorCode;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ImageReqDTO {
    @NotNull(message = ImageErrorCode.ORDINAL_NUMBER__REQUIRED)
    @Min(value = 1, message = ImageErrorCode.ORDINAL_NUMBER__INVALID)
    private int ordinalNumber;

    @NotBlank(message = ImageErrorCode.LESSON_ID__REQUIRED)
    private String lessonId;
}
