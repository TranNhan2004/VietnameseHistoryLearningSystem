package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.ParagraphErrorCode;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ParagraphReqDTO {
    @NotBlank(message = ParagraphErrorCode.CONTENT__REQUIRED)
    private String content;

    @NotNull(message = ParagraphErrorCode.ORDINAL_NUMBER__REQUIRED)
    @Min(value = 1, message = ParagraphErrorCode.ORDINAL_NUMBER__INVALID)
    private int ordinalNumber;

    @NotBlank(message = ParagraphErrorCode.LESSON_ID__REQUIRED)
    private String lessonId;
}
