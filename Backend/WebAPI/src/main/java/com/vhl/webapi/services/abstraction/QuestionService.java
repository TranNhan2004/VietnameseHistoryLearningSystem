package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.QuestionReqDTO;
import com.vhl.webapi.dtos.requests.UpdateQuestionReqDTO;
import com.vhl.webapi.dtos.responses.QuestionResDTO;

import java.util.List;

public interface QuestionService {
    QuestionResDTO createQuestion(QuestionReqDTO questionReqDTO);

    List<QuestionResDTO> getAllQuestions();

    QuestionResDTO getQuestionById(String id);

    void updateQuestion(String id, UpdateQuestionReqDTO updateQuestionReqDTO);

    void deleteQuestion(String id);
}
