package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.IBaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Data
@Table(
    name = "learner_lesson_answers",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uc_lla_learner_and_lesson_and_answer_option",
            columnNames = {"learner_id", "lesson_id", "answer_option_id"}
        )
    }
)
public class LearnerLessonAnswer extends IBaseEntity {
    @ManyToOne
    @JoinColumn(name = "learner_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Learner learner;

    @ManyToOne
    @JoinColumn(name = "lesson_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Lesson lesson;

    @ManyToOne
    @JoinColumn(name = "answer_option_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private AnswerOption answerOption;
}
