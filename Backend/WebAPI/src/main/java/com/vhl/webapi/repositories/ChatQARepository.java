package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.ChatQA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatQARepository extends JpaRepository<ChatQA, String> {

}