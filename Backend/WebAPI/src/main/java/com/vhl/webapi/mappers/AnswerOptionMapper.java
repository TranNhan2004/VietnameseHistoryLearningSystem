package com.vhl.webapi.mappers;

import com.vhl.webapi.dtos.requests.AnswerOptionReqDTO;
import com.vhl.webapi.dtos.requests.UpdateAnswerOptionReqDTO;
import com.vhl.webapi.dtos.responses.AnswerOptionResDTO;
import com.vhl.webapi.entities.specific.AnswerOption;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AnswerOptionMapper {
    @Mapping(target = "question", ignore = true)
    AnswerOption toAnswerOption(AnswerOptionReqDTO answerOptionReqDTO);

    @Mapping(target = "questionId", source = "question.id")
    AnswerOptionResDTO toAnswerOptionResDTO(AnswerOption answerOption);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "question", ignore = true)
    void updateAnswerOptionFromDTO(UpdateAnswerOptionReqDTO updateAnswerOptionReqDTO, @MappingTarget AnswerOption answerOption);
}
