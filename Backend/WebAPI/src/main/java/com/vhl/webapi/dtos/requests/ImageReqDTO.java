package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.ImageErrorCode;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ImageReqDTO {
    @NotBlank(message = ImageErrorCode.TITLE__REQUIRED)
    @Size(max = 1024, message = ImageErrorCode.TITLE__TOO_LONG)
    private String title;

    @NotNull(message = ImageErrorCode.ORDINAL_NUMBER__REQUIRED)
    @Min(value = 1, message = ImageErrorCode.ORDINAL_NUMBER__INVALID)
    private Integer ordinalNumber;

    @NotBlank(message = ImageErrorCode.LESSON_ID__REQUIRED)
    private String lessonId;
}
