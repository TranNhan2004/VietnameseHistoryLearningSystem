package com.vhl.webapi.dtos.responses;

import lombok.Data;

@Data
public class ImageResDTO {
    private String id;
    private String title;
    private int ordinalNumber;
    private String imageUrl;
    private String lessonId;
}
