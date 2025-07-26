package com.vhl.webapi.dtos.responses;

import lombok.Data;

@Data
public class StudyProgressResDTO {
    private String id;
    private Double progress;
    private String lessonId;
    private String learnerId;
}
