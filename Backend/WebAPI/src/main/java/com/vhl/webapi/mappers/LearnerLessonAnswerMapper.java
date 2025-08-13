package com.vhl.webapi.mappers;

import com.vhl.webapi.dtos.responses.LearnerLessonAnswerResDTO;
import com.vhl.webapi.entities.specific.LearnerLessonAnswer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LearnerLessonAnswerMapper {
    @Mapping(target = "learnerId", source = "learner.id")
    @Mapping(target = "lessonId", source = "lesson.id")
    @Mapping(target = "answerOptionId", source = "answerOption.id")
    LearnerLessonAnswerResDTO toLearnerLessonAnswerResDTO(LearnerLessonAnswer learnerLessonAnswer);
}
