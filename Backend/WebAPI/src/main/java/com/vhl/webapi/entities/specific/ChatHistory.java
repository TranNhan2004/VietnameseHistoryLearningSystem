package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.ICBaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "chat_histories")
public class ChatHistory extends ICBaseEntity {
    @Column(name = "title", nullable = false, length = 1024)
    private String title;

    @ManyToOne
    @JoinColumn(name = "learner_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Learner learner;

    @OneToMany(mappedBy = "chatHistory", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatQA> chatQAs = new ArrayList<>();
}
