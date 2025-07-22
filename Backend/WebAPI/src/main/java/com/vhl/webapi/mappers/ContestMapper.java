package com.vhl.webapi.mappers;

import com.vhl.webapi.dtos.requests.ContestReqDTO;
import com.vhl.webapi.dtos.responses.ContestResDTO;
import com.vhl.webapi.entities.specific.Contest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = {ContestQuestionMapper.class})
public interface ContestMapper {
    @Mapping(target = "contestQuestions", ignore = true)
    Contest toContest(ContestReqDTO contestReqDTO);
    
    ContestResDTO toContestResDTO(Contest contest);

    void updateContestFromDTO(ContestReqDTO contestReqDTO, @MappingTarget Contest contest);
}
