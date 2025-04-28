package com.vhl.webapi.entities.superclass;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;

@MappedSuperclass
@Data
public abstract class ICBaseEntity extends IBaseEntity {
    @CreatedDate
    @Column(name = "created_at", updatable = false, columnDefinition = "TIMESTAMP")
    protected Instant createdAt;
}
