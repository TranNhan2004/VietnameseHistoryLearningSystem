package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.IBaseEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "historical_periods")
public class HistoricalPeriod extends IBaseEntity {
    @Column(name = "name", nullable = false, length = 1024)
    private String name;

    @Column(name = "start_year", nullable = false)
    private int startYear;

    @Column(name = "end_year", nullable = false)
    private int endYear;

    @OneToMany(mappedBy = "historicalPeriod", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Lesson> lessons = new ArrayList<>();
}
