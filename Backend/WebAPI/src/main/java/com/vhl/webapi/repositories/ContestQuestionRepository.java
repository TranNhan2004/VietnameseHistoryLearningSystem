package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.ContestQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContestQuestionRepository extends JpaRepository<ContestQuestion, String> {

}