package com.vhl.webapi.mappers;

import com.vhl.webapi.dtos.requests.AnswerOptionReqDTO;
import com.vhl.webapi.dtos.responses.AnswerOptionResDTO;
import com.vhl.webapi.entities.specific.AnswerOption;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AnswerOptionMapper {
    AnswerOption toAnswerOption(AnswerOptionReqDTO answerOptionReqDTO);

    AnswerOptionResDTO toAnswerOptionResDTO(AnswerOption answerOption);
}
