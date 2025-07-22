package com.vhl.webapi.dtos.responses;

import lombok.Data;

@Data
public class ChatQAResDTO {
    private String question;
    private String answer;
    private Boolean liked = false;
    private Boolean disliked = false;

}
