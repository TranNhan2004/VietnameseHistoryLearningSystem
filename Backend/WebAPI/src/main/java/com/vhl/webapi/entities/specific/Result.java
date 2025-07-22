package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.IBaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Entity
@Data
@Table(
    name = "results",
    uniqueConstraints = {@UniqueConstraint(name = "uc_results_learner_and_contest", columnNames = {"learner_id", "contest_id"})}
)
public class Result extends IBaseEntity {
    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "correct_answers_number", nullable = false)
    private Integer correctAnswersNumber;

    @Column(name = "score", nullable = false)
    private Double score;

    @ManyToOne
    @JoinColumn(name = "learner_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Learner learner;

    @ManyToOne
    @JoinColumn(name = "contest_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Contest contest;
}
