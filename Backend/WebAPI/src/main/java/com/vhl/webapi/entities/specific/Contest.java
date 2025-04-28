package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.ICUBaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "contests")
public class Contest extends ICUBaseEntity {
    @Column(name = "question_number", nullable = false)
    private int questionNumber;

    @Column(name = "duration_in_minutes", nullable = false)
    private int durationInMinutes;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_date", nullable = false)
    private LocalDateTime endTime;
}
