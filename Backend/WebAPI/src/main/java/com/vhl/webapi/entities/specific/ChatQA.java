package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.ICBaseEntity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "chat_qas")
public class ChatQA extends ICBaseEntity {
    @Column(name = "question", nullable = false, columnDefinition = "TEXT")
    private String question;

    @Column(name = "answer", nullable = false, columnDefinition = "MEDIUMTEXT")
    private String answer;

    @Column(name = "liked", nullable = false)
    private boolean liked = false;

    @Column(name = "disliked", nullable = false)
    private boolean disliked = false;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "chat_history_id", nullable = false)
    private ChatHistory chatHistory;
}
