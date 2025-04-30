package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponseRepository extends JpaRepository<Response, String> {

}