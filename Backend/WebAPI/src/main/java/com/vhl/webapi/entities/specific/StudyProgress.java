package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.ICBaseEntity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(
        name = "study_progresses",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uc_learner_id_and_lesson_id",
                        columnNames = {"learner_id", "lesson_id"}
                )
        }
)
public class StudyProgress extends ICBaseEntity {
    @Column(name = "progress")
    public Integer progress;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "learner_id")
    public Learner learner;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "lesson_id")
    public Lesson lesson;
}
