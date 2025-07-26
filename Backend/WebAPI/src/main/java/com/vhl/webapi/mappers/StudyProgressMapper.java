package com.vhl.webapi.mappers;

import com.vhl.webapi.dtos.responses.StudyProgressResDTO;
import com.vhl.webapi.entities.specific.StudyProgress;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StudyProgressMapper {
    StudyProgressResDTO toStudyProgressResDTO(StudyProgress studyProgress);
}
