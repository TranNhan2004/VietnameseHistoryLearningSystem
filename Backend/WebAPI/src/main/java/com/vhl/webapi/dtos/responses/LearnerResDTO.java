package com.vhl.webapi.dtos.responses;

import lombok.Data;

@Data
public class LearnerResDTO extends BaseUserResDTO {
    private String rank;
    private int point;
    private Double bestScore;
    private Double worstScore;
}
