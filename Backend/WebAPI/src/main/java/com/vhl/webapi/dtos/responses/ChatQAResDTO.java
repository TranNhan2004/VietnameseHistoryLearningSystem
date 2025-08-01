package com.vhl.webapi.dtos.responses;

import lombok.Data;

import java.time.Instant;

@Data
public class ChatQAResDTO {
    private String question;
    private String answer;
    private String chatHistoryId;
    private Instant createdAt;
}
