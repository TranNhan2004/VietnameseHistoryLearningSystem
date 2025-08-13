package com.vhl.webapi.dtos.responses;

import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class LessonResDTO {
    private String id;
    private String title;
    private String videoUrl;
    private Integer views;
    private String description;
    private String historicalPeriodId;
    private String adminId;
    private List<ParagraphResDTO> paragraphs;
    private List<ImageResDTO> images;
    private List<QuestionResDTO> questions;
    private Instant createdAt;
    private Instant updatedAt;
}
