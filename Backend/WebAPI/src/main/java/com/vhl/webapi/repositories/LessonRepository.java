package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, String> {

}