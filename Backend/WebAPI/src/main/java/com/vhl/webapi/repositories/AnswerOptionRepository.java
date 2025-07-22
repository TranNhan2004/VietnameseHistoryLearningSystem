package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.AnswerOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerOptionRepository extends JpaRepository<AnswerOption, String> {
    void deleteByQuestion_Id(String questionId);
}