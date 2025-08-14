package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.Contest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContestRepository extends JpaRepository<Contest, String> {
    List<Contest> findAllByIdIn(List<String> ids);

    List<String> id(String id);
}
