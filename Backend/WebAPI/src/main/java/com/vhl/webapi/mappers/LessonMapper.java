package com.vhl.webapi.mappers;

import com.vhl.webapi.dtos.requests.LessonReqDTO;
import com.vhl.webapi.dtos.responses.LessonResDTO;
import com.vhl.webapi.entities.specific.Lesson;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface LessonMapper {
    LessonResDTO toLessonResDTO(Lesson lesson);

    Lesson toLesson(LessonReqDTO lessonReqDTO);

    void updateLessonFromDTO(LessonReqDTO lessonReqDTO, @MappingTarget Lesson lesson);
}
