package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultRepository extends JpaRepository<Result, String> {

}