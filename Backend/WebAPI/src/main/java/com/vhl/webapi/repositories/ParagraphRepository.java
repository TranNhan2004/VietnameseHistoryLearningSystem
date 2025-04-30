package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.Paragraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParagraphRepository extends JpaRepository<Paragraph, String> {

}