package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.ICBaseEntity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "chat_histories")
public class ChatHistory extends ICBaseEntity {
    @Column(name = "title", nullable = false, length = 1024)
    private String title;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "learner_id", nullable = false)
    private Learner learner;
}
