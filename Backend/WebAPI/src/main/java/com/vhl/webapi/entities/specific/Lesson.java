package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.ICUBaseEntity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "lessons")
public class Lesson extends ICUBaseEntity {
    @Column(name = "title", nullable = false, length = 1024)
    private String title;

    @Column(name = "video_url", length = 2048)
    private String videoUrl;

    @Column(name = "likes")
    private int likes = 0;

    @Column(name = "views")
    private int views = 0;

    @Column(name = "description", length = 1024)
    private String description;

    @ManyToOne
    @JoinColumn(name = "historical_period_id")
    private HistoricalPeriod historicalPeriod;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "admin_id")
    private Admin admin;
}
