package com.vhl.webapi.dtos.responses;

import lombok.Data;

@Data
public class ParagraphResDTO {
    private String id;
    private String content;
    private Integer ordinalNumber;
    private String lessonId;
}
