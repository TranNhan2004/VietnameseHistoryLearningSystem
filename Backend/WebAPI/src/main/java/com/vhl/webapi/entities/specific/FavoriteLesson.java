package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.IBaseEntity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(
        name = "favorite_lessons",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uc_learner_id_and_lesson_id",
                        columnNames = {"learner_id", "lesson_id"}
                )
        }
)
public class FavoriteLesson extends IBaseEntity {
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "learner_id", nullable = false)
    private Learner learner;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;
}
