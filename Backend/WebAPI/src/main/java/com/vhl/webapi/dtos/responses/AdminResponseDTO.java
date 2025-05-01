package com.vhl.webapi.dtos.responses;

import lombok.Data;

@Data
public class AdminResponseDTO extends BaseUserResponseDTO {
    private String adminLevel;
}
