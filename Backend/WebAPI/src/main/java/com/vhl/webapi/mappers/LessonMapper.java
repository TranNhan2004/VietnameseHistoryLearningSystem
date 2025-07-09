package com.vhl.webapi.mappers;

import com.vhl.webapi.dtos.requests.LessonReqDTO;
import com.vhl.webapi.dtos.responses.LessonResDTO;
import com.vhl.webapi.entities.specific.Lesson;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface LessonMapper {
    @Mapping(target = "historicalPeriodId", source = "historicalPeriod.id")
    @Mapping(target = "adminId", source = "admin.id")
    LessonResDTO toLessonResDTO(Lesson lesson);

    @Mapping(target = "historicalPeriod", ignore = true)
    @Mapping(target = "admin", ignore = true)
    Lesson toLesson(LessonReqDTO lessonReqDTO);

    @Mapping(target = "historicalPeriod", ignore = true)
    @Mapping(target = "admin", ignore = true)
    void updateLessonFromDTO(LessonReqDTO lessonReqDTO, @MappingTarget Lesson lesson);
}
