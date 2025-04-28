package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.ICUBaseEntity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "comments")
public class Comment extends ICUBaseEntity {
    @Column(name = "content")
    private String content;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "base_user_id", nullable = false)
    private BaseUser baseUser;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;
}
