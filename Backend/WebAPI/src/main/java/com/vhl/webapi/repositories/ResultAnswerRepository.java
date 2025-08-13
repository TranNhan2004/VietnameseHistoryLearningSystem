package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.ResultAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultAnswerRepository extends JpaRepository<ResultAnswer, String> {
    List<ResultAnswer> findAllByResult_Id(String resultId);
}