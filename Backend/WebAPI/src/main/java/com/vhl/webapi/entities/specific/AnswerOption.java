package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.IBaseEntity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "answer_options")
public class AnswerOption extends IBaseEntity {
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "is_correct", nullable = false)
    private boolean isCorrect = false;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "question_id")
    private Question question;
}
