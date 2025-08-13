package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.ContestQuestionReqDTO;
import com.vhl.webapi.dtos.requests.CreateContestQuestionsReqDTO;
import com.vhl.webapi.dtos.responses.ContestQuestionResDTO;

import java.util.List;

public interface ContestQuestionService {
    List<ContestQuestionResDTO> getAllContestQuestionsByContestId(String contestId);

    ContestQuestionResDTO getContestQuestionById(String id);

    ContestQuestionResDTO createContestQuestion(ContestQuestionReqDTO contestQuestionReqDTO);

    List<ContestQuestionResDTO> createContestQuestions(CreateContestQuestionsReqDTO createContestQuestionsReqDTO);

    void updateContestQuestion(String id, ContestQuestionReqDTO contestQuestionReqDTO);

    void deleteContestQuestion(String id);

}
