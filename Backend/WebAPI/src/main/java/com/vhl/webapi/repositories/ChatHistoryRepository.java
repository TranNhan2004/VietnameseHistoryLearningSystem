package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.ChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatHistoryRepository extends JpaRepository<ChatHistory, String> {
    List<ChatHistory> findAllByLearner_Id(String learnerId);
}