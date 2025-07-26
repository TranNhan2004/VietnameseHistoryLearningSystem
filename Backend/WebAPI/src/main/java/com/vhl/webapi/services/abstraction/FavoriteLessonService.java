package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.FavoriteLessonReqDTO;
import com.vhl.webapi.dtos.responses.FavoriteLessonResDTO;

import java.util.List;

public interface FavoriteLessonService {
    List<FavoriteLessonResDTO> getFavoriteLessonsByLearner(String learnerId);

    FavoriteLessonResDTO createFavoriteLesson(FavoriteLessonReqDTO favoriteLessonReqDTO);

    void deleteFavoriteLesson(String id);
}
