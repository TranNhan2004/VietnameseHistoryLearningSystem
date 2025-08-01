package com.vhl.webapi.entities.specific;

import com.vhl.webapi.enums.LearnerRank;
import com.vhl.webapi.enums.Role;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "learners")
@PrimaryKeyJoinColumn(name = "id")
public class Learner extends BaseUser {
    @Enumerated(EnumType.STRING)
    @Column(name = "learner_rank", nullable = false)
    private LearnerRank rank = LearnerRank.BEGINNER;

    @Column(name = "point", nullable = false)
    private Integer point = 0;

    @Column(name = "best_score")
    private Double bestScore;

    @Column(name = "worst_score")
    private Double worstScore;


    @Override
    public String getFullRole() {
        return Role.LEARNER.name();
    }
}
