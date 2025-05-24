package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.ChatHistoryErrorCode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ChatHistoryReqDTO {
    @NotBlank(message = ChatHistoryErrorCode.TITLE__REQUIRED)
    @Size(max = 1024, message = ChatHistoryErrorCode.TITLE__TOO_LONG)
    private String title;

    @NotBlank(message = ChatHistoryErrorCode.LEARNER_ID__REQUIRED)
    private String learnerId;
}
