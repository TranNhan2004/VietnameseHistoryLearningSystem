package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.ICBaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Data
@Table(name = "chat_qas")
public class ChatQA extends ICBaseEntity {
    @Column(name = "question", nullable = false, columnDefinition = "TEXT")
    private String question;

    @Column(name = "answer", nullable = false, columnDefinition = "MEDIUMTEXT")
    private String answer;

    @Column(name = "liked", nullable = false)
    private Boolean liked = false;

    @Column(name = "disliked", nullable = false)
    private Boolean disliked = false;

    @ManyToOne
    @JoinColumn(name = "chat_history_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ChatHistory chatHistory;
}
