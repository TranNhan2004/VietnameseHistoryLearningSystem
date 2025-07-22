package com.vhl.webapi.mappers;

import com.vhl.webapi.dtos.requests.QuestionReqDTO;
import com.vhl.webapi.dtos.responses.QuestionResDTO;
import com.vhl.webapi.entities.specific.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {AnswerOptionMapper.class})
public interface QuestionMapper {
    @Mapping(target = "lesson", ignore = true)
    @Mapping(target = "answerOptions", ignore = true)
    Question toQuestion(QuestionReqDTO questionReqDTO);
    
    @Mapping(target = "lesson", ignore = true)
    @Mapping(target = "answerOptions", ignore = true)
    Question toQuestionForUpdate(QuestionReqDTO questionReqDTO);

    @Mapping(target = "lessonId", source = "lesson.id")
    QuestionResDTO toQuestionResDTO(Question question);
}
