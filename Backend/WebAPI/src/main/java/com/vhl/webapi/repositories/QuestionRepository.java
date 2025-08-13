package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, String> {
    List<Question> findByIdIn(List<String> ids);
}

