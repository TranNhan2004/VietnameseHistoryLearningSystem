package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.ContestQuestionReqDTO;
import com.vhl.webapi.dtos.responses.ContestQuestionResDTO;

import java.util.List;

public interface ContestQuestionService {
    List<ContestQuestionResDTO> getAllContestQuestionsByContestId(String contestId);

    ContestQuestionResDTO getContestQuestionById(String id);

    ContestQuestionResDTO createContestQuestion(ContestQuestionReqDTO contestQuestionReqDTO);

    void updateContestQuestion(String id, ContestQuestionReqDTO contestQuestionReqDTO);

    void deleteContestQuestion(String id);

}
