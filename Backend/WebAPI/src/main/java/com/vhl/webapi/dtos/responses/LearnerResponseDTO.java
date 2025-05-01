package com.vhl.webapi.dtos.responses;

import lombok.Data;

@Data
public class LearnerResponseDTO extends BaseUserResponseDTO {
    private String rank;
    private int point;
    private Double bestScore;
    private Double worstScore;
}
