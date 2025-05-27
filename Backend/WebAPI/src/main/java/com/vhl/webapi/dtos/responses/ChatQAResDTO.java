package com.vhl.webapi.dtos.responses;

import lombok.Data;

@Data
public class ChatQAResDTO {
    private String question;
    private String answer;
    private boolean liked = false;
    private boolean disliked = false;

}
