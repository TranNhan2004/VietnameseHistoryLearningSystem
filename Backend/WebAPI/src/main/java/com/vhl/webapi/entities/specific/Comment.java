package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.ICUBaseEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "comments")
public class Comment extends ICUBaseEntity {
    @Column(name = "content", nullable = false, length = 10000)
    private String content;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "base_user_id", nullable = false)
    private BaseUser baseUser;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;

    @OneToMany(mappedBy = "fromComment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Response> responses = new ArrayList<>();
}
