package com.vhl.webapi.entities.superclass;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.Instant;

@MappedSuperclass
@Data
public abstract class ICUBaseEntity extends ICBaseEntity {
    @LastModifiedDate
    @Column(name = "updated_at", columnDefinition = "TIMESTAMP")
    protected Instant updatedAt;
}
