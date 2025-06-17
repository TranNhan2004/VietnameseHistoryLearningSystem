package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.IBaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Data
@Table(
    name = "result_answers",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uc_ra_result_and_answer_option",
            columnNames = {"result_id", "answer_option_id"}
        )
    }
)
public class ResultAnswer extends IBaseEntity {
    @ManyToOne
    @JoinColumn(name = "result_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Result result;

    @ManyToOne
    @JoinColumn(name = "answer_option_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private AnswerOption answerOption;
}
