package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.ICBaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Data
@Table(
    name = "study_progresses",
    uniqueConstraints = {@UniqueConstraint(name = "uc_sp_learner_and_lesson", columnNames = {"learner_id", "lesson_id"})}
)
public class StudyProgress extends ICBaseEntity {
    @Column(name = "progress")
    public Double progress;

    @ManyToOne
    @JoinColumn(name = "learner_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    public Learner learner;

    @ManyToOne
    @JoinColumn(name = "lesson_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    public Lesson lesson;
}
