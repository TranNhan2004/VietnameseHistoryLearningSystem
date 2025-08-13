package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.AnswerOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerOptionRepository extends JpaRepository<AnswerOption, String> {
    List<AnswerOption> findByIdIn(List<String> ids);

    void deleteByQuestion_Id(String questionId);
}