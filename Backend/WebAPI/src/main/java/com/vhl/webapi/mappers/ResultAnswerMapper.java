package com.vhl.webapi.mappers;

import com.vhl.webapi.dtos.responses.ResultAnswerResDTO;
import com.vhl.webapi.entities.specific.ResultAnswer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ResultAnswerMapper {
    @Mapping(target = "resultId", source = "result.id")
    @Mapping(target = "answerOptionId", source = "answerOption.id")
    ResultAnswerResDTO toResultAnswerResDTO(ResultAnswer resultAnswer);
}
