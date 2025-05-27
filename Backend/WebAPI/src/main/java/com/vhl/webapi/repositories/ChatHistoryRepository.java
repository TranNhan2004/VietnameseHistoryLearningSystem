package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.ChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatHistoryRepository extends JpaRepository<ChatHistory, String> {

}