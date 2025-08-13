package com.vhl.webapi.dtos.requests;

import lombok.Data;

import java.util.List;

@Data
public class CreateContestQuestionsReqDTO {
    private String contestId;
    private List<String> questionIds;
}
