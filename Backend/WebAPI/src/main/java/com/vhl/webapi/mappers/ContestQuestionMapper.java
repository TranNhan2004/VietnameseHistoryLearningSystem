package com.vhl.webapi.mappers;

import com.vhl.webapi.dtos.requests.ContestQuestionReqDTO;
import com.vhl.webapi.dtos.responses.ContestQuestionResDTO;
import com.vhl.webapi.entities.specific.ContestQuestion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ContestQuestionMapper {
    @Mapping(target = "contest", ignore = true)
    @Mapping(target = "question", ignore = true)
    ContestQuestion toContestQuestion(ContestQuestionReqDTO contestQuestionReqDTO);

    @Mapping(target = "contestId", source = "contest.id")
    @Mapping(target = "questionId", source = "question.id")
    ContestQuestionResDTO toContestQuestionResDTO(ContestQuestion contestQuestion);

    @Mapping(target = "contest", ignore = true)
    @Mapping(target = "question", ignore = true)
    void updateContestQuestionFromDTO(ContestQuestionReqDTO contestQuestionReqDTO, @MappingTarget ContestQuestion contestQuestion);
}
