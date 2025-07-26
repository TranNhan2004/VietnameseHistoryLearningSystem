package com.vhl.webapi.dtos.responses;

import lombok.Data;

@Data
public class FavoriteLessonResDTO {
    private String id;
    private String learnerId;
    private String lessonId;
}
