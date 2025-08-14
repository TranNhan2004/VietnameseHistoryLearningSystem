package com.vhl.webapi.mappers;

import com.vhl.webapi.dtos.responses.ResultResDTO;
import com.vhl.webapi.entities.specific.Result;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ResultMapper {
    @Mapping(target = "contestId", source = "contest.id")
    @Mapping(target = "learnerId", source = "learner.id")
    ResultResDTO toResultResDTO(Result result);
}
