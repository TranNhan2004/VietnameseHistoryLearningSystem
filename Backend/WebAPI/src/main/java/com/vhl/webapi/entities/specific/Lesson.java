package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.ICUBaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "lessons")
public class Lesson extends ICUBaseEntity {
    @Column(name = "title", nullable = false, length = 1024)
    private String title;

    @Column(name = "video_url", length = 2048)
    private String videoUrl;

    @Column(name = "likes", nullable = false)
    private int likes = 0;

    @Column(name = "views", nullable = false)
    private int views = 0;

    @Column(name = "description", length = 1024)
    private String description;

    @ManyToOne
    @JoinColumn(name = "historical_period_id", nullable = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    private HistoricalPeriod historicalPeriod;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Admin admin;

    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Paragraph> paragraphs = new ArrayList<>();

    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images = new ArrayList<>();

    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions = new ArrayList<>();
}
