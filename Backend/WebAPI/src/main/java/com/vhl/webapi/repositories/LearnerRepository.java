package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.Learner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LearnerRepository extends JpaRepository<Learner, String> {

}