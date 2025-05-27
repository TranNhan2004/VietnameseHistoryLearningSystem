package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.Learner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearnerRepository extends JpaRepository<Learner, String> {

}