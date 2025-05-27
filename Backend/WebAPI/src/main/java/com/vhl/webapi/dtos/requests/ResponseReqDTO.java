package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.ResponseErrorCode;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ResponseReqDTO {
    @NotBlank(message = ResponseErrorCode.FROM_COMMENT_ID__REQUIRED)
    private String fromCommentId;

    @NotBlank(message = ResponseErrorCode.TO_COMMENT_ID__REQUIRED)
    private String toCommentId;
}
