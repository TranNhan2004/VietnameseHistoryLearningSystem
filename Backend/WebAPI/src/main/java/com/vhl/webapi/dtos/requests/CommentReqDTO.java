package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.CommentErrorCode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CommentReqDTO {
    @NotBlank(message = CommentErrorCode.CONTENT__REQUIRED)
    @Size(max = 1024, message = CommentErrorCode.CONTENT__TOO_LONG)
    private String content;

    @NotBlank(message = CommentErrorCode.BASE_USER_ID__REQUIRED)
    private String baseUserId;

    @NotBlank(message = CommentErrorCode.LESSON_ID__REQUIRED)
    private String lessonId;
}
