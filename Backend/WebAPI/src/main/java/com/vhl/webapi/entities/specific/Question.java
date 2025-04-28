package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.IBaseEntity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "questions")
public class Question extends IBaseEntity {
    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;
}
