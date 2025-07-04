package com.vhl.webapi.dtos.responses;

import lombok.Data;

@Data
public class ImageResDTO {
    private String id;
    private String imageUrl;
    private int ordinalNumber;
}
