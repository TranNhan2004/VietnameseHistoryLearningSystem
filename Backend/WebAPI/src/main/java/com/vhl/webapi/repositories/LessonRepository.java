package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, String> {
    @Query("SELECT l FROM Lesson l LEFT JOIN FETCH l.paragraphs WHERE l.id = :id")
    Optional<Lesson> findByIdWithParagraphs(String id);

    @Query("SELECT l FROM Lesson l LEFT JOIN FETCH l.images WHERE l.id = :id")
    Optional<Lesson> findByIdWithImages(String id);

    @Query("SELECT l FROM Lesson l LEFT JOIN FETCH l.questions WHERE l.id = :id")
    Optional<Lesson> findByIdWithQuestions(String id);

    List<Lesson> findAllByHistoricalPeriod_Id(String historicalPeriodId);

    List<Lesson> findByIdIn(List<String> ids);
}
