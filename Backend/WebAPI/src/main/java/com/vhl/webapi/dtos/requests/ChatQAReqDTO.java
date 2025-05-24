package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.ChatQAErrorCode;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ChatQAReqDTO {
    @NotBlank(message = ChatQAErrorCode.QUESTION__REQUIRED)
    private String question;

    @NotBlank(message = ChatQAErrorCode.ANSWER__REQUIRED)
    private String answer;

    @NotBlank(message = ChatQAErrorCode.LIKED__REQUIRED)
    private boolean liked = false;

    @NotBlank(message = ChatQAErrorCode.DISLIKED__REQUIRED)
    private boolean disliked = false;

    @NotBlank(message = ChatQAErrorCode.CHAT_HISTORY_ID__REQUIRED)
    private String chatHistoryId;
}
