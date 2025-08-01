package com.vhl.webapi.dtos.responses;

import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class ChatHistoryResDTO {
    private String id;
    private String title;
    private String learnerId;
    private List<ChatQAResDTO> chatQAs;
    private Instant createdAt;
}
