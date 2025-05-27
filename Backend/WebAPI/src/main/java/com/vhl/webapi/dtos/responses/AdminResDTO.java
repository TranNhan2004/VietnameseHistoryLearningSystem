package com.vhl.webapi.dtos.responses;

import lombok.Data;

@Data
public class AdminResDTO extends BaseUserResDTO {
    private String adminLevel;
}
