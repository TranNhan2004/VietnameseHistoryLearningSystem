package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.IdsReqDTO;
import com.vhl.webapi.dtos.requests.QuestionReqDTO;
import com.vhl.webapi.dtos.requests.UpdateQuestionReqDTO;
import com.vhl.webapi.dtos.requests.UpdateQuestionsForLessonReqDTO;
import com.vhl.webapi.dtos.responses.QuestionResDTO;

import java.util.List;

public interface QuestionService {
    QuestionResDTO createQuestion(QuestionReqDTO questionReqDTO);

    List<QuestionResDTO> getAllQuestions();

    List<QuestionResDTO> getQuestionsByIds(IdsReqDTO idsReqDTO);

    void updateQuestionForLesson(UpdateQuestionsForLessonReqDTO updateQuestionsForLessonReqDTO);

    QuestionResDTO getQuestionById(String id);

    void updateQuestion(String id, UpdateQuestionReqDTO updateQuestionReqDTO);

    void deleteQuestion(String id);
}
