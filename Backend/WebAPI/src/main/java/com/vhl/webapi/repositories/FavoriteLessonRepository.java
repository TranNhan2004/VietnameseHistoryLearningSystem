package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.FavoriteLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteLessonRepository extends JpaRepository<FavoriteLesson, String> {
    List<FavoriteLesson> findAllByLearner_Id(String learnerId);
}