package com.vhl.webapi.mappers;

import com.vhl.webapi.dtos.responses.FavoriteLessonResDTO;
import com.vhl.webapi.entities.specific.FavoriteLesson;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FavoriteLessonMapper {
    @Mapping(target = "lessonId", source = "lesson.id")
    @Mapping(target = "learnerId", source = "learner.id")
    FavoriteLessonResDTO toFavoriteLessonResDTO(FavoriteLesson favoriteLesson);
}
