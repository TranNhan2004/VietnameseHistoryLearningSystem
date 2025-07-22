package com.vhl.webapi.dtos.responses;

import lombok.Data;

@Data
public class ContestQuestionResDTO {
    private String id;
    private Double point;
    private String pointAllocationRule;
    private String contestId;
    private String questionId;
}
