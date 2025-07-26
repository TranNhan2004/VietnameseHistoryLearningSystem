package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.StudyProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudyProgressRepository extends JpaRepository<StudyProgress, String> {
    List<StudyProgress> findAllByLearner_Id(String learnerId);
}