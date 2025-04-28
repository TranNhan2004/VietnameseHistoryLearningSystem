package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.IBaseEntity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "image")
public class Image extends IBaseEntity {
    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(name = "ordinal_number", nullable = false)
    private int ordinalNumber;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;
}
