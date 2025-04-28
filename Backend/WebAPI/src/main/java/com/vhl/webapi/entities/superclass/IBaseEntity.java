package com.vhl.webapi.entities.superclass;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

@MappedSuperclass
@Data
public abstract class IBaseEntity {
    @Id
    @GenericGenerator(name = "shortUUID", strategy = "com.vhl.webapi.utils.shortuuid.ShortUUIDGenerator")
    @GeneratedValue(generator = "shortUUID")
    @Column(name = "id", updatable = false, columnDefinition = "CHAR(22)")
    protected String id;
}
