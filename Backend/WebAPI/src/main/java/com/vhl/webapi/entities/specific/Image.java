package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.IBaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Data
@Table(name = "images")
public class Image extends IBaseEntity {
    @Column(name = "image_url", nullable = false, length = 2048)
    private String imageUrl;

    @Column(name = "ordinal_number", nullable = false)
    private int ordinalNumber;

    @ManyToOne
    @JoinColumn(name = "lesson_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Lesson lesson;
}
