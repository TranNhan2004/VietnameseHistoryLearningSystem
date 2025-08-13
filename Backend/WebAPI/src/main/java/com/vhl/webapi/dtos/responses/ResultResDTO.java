package com.vhl.webapi.dtos.responses;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ResultResDTO {
    private String id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Double score;
    private String learnerId;
    private String contestId;
}
