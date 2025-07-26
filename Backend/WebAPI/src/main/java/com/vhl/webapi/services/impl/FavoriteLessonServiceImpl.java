package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.FavoriteLessonErrorCode;
import com.vhl.webapi.constants.errorcodes.LearnerErrorCode;
import com.vhl.webapi.constants.errorcodes.LessonErrorCode;
import com.vhl.webapi.dtos.requests.FavoriteLessonReqDTO;
import com.vhl.webapi.dtos.responses.FavoriteLessonResDTO;
import com.vhl.webapi.entities.specific.FavoriteLesson;
import com.vhl.webapi.entities.specific.Learner;
import com.vhl.webapi.entities.specific.Lesson;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.mappers.FavoriteLessonMapper;
import com.vhl.webapi.repositories.FavoriteLessonRepository;
import com.vhl.webapi.repositories.LearnerRepository;
import com.vhl.webapi.repositories.LessonRepository;
import com.vhl.webapi.services.abstraction.FavoriteLessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteLessonServiceImpl implements FavoriteLessonService {
    private final FavoriteLessonRepository favoriteLessonRepository;
    private final FavoriteLessonMapper favoriteLessonMapper;
    private final LessonRepository lessonRepository;
    private final LearnerRepository learnerRepository;


    @Override
    @Transactional
    public List<FavoriteLessonResDTO> getFavoriteLessonsByLearner(String learnerId) {
        List<FavoriteLesson> favoriteLessons = favoriteLessonRepository.findAllByLearner_Id(learnerId);
        return favoriteLessons.stream()
            .map(favoriteLessonMapper::toFavoriteLessonResDTO)
            .toList();
    }

    @Override
    public FavoriteLessonResDTO createFavoriteLesson(FavoriteLessonReqDTO favoriteLessonReqDTO) {
        Lesson lesson = lessonRepository.findById(favoriteLessonReqDTO.getLessonId())
            .orElseThrow(() -> new NoInstanceFoundException(LessonErrorCode.LESSON__NOT_FOUND));

        Learner learner = learnerRepository.findById(favoriteLessonReqDTO.getLearnerId())
            .orElseThrow(() -> new NoInstanceFoundException(LearnerErrorCode.LEARNER__NOT_FOUND));

        FavoriteLesson favoriteLesson = new FavoriteLesson();
        favoriteLesson.setLesson(lesson);
        favoriteLesson.setLearner(learner);
        FavoriteLesson saved = favoriteLessonRepository.save(favoriteLesson);
        return favoriteLessonMapper.toFavoriteLessonResDTO(saved);
    }

    @Override
    public void deleteFavoriteLesson(String id) {
        if (!favoriteLessonRepository.existsById(id)) {
            throw new NoInstanceFoundException(FavoriteLessonErrorCode.FAVORITE_LESSON__NOT_FOUND);
        }

        favoriteLessonRepository.deleteById(id);
    }
}
