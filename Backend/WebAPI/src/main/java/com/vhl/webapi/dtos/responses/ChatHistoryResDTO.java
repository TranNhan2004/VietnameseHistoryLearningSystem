package com.vhl.webapi.dtos.responses;

import lombok.Data;

import java.util.List;

@Data
public class ChatHistoryResDTO {
    private String id;
    private String title;
    private List<ChatQAResDTO> chatQAs;
}
