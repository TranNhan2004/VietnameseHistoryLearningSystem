package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.IBaseEntity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(
        name = "contest_questions",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uc_contest_id_and_question_id",
                        columnNames = {"contest_id", "question_id"}
                )
        }
)
public class ContestQuestion extends IBaseEntity {
    @Column(name = "point")
    private int point;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "contest_id")
    private Contest contest;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "question_id")
    private Question question;
}
