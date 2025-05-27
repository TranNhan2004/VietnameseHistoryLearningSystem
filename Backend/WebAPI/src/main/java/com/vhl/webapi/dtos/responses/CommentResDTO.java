package com.vhl.webapi.dtos.responses;

import com.vhl.webapi.entities.specific.BaseUser;
import com.vhl.webapi.entities.specific.Lesson;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
public class CommentResDTO {
    @Column(name = "content", nullable = false, length = 10000)
    private String content;

    @ManyToOne
    @JoinColumn(name = "base_user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private BaseUser baseUser;

    @ManyToOne
    @JoinColumn(name = "lesson_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Lesson lesson;
}
