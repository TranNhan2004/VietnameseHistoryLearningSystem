package com.vhl.webapi.dtos.requests;

import lombok.Data;

import java.util.List;

@Data
public class UpdateQuestionsForLessonReqDTO {
    private String lessonId;
    private List<String> questionIds;
}
