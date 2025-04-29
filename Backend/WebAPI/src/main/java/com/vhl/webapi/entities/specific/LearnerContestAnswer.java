package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.IBaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Data
@Table(
        name = "learner_contest_answers",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uc_lca_learner_and_contest_and_answer_option",
                        columnNames = {"learner_id", "contest_id", "answer_option_id"}
                )
        }
)
public class LearnerContestAnswer extends IBaseEntity {
    @ManyToOne
    @JoinColumn(name = "learner_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Learner learner;

    @ManyToOne
    @JoinColumn(name = "contest_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Contest contest;

    @ManyToOne
    @JoinColumn(name = "answer_option_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private AnswerOption answerOption;
}
