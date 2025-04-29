package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.IBaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Data
@Table(
        name = "contest_questions",
        uniqueConstraints = {@UniqueConstraint(name = "uc_cq_contest_and_question", columnNames = {"contest_id", "question_id"})}
)
public class ContestQuestion extends IBaseEntity {
    @Column(name = "point", nullable = false)
    private double point;

    @Column(name = "point_allocation_rule", nullable = false, columnDefinition = "TEXT")
    private String pointAllocationRule;

    @ManyToOne
    @JoinColumn(name = "contest_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Contest contest;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Question question;
}
