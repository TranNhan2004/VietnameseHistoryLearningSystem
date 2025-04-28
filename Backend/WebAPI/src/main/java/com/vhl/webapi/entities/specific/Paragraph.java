package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.IBaseEntity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "paragraphs")
public class Paragraph extends IBaseEntity {
    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "ordinal_number", nullable = false)
    private int ordinalNumber;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;
}
