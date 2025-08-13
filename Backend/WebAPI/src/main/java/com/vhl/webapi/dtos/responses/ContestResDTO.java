package com.vhl.webapi.dtos.responses;

import lombok.Data;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ContestResDTO {
    private String id;
    private String name;
    private String description;
    private Integer durationInMinutes;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private List<ContestQuestionResDTO> contestQuestions;
    private Instant createdAt;
    private Instant updatedAt;
}
