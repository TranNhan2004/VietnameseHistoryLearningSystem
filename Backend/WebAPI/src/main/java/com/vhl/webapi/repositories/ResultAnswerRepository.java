package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.ResultAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultAnswerRepository extends JpaRepository<ResultAnswer, String> {

}