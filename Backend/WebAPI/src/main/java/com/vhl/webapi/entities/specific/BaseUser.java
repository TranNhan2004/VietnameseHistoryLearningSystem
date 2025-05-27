package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.ICUBaseEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "base_users")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class BaseUser extends ICUBaseEntity {
    @Column(name = "user_name", length = 64, nullable = false, unique = true)
    protected String userName;

    @Column(name = "email", length = 256, nullable = false, unique = true)
    protected String email;

    @Column(name = "password", length = 128, nullable = false)
    protected String password;

    @Column(name = "first_name", length = 50, nullable = false)
    protected String firstName;

    @Column(name = "last_name", length = 100, nullable = false)
    protected String lastName;

    @Column(name = "date_of_birth")
    protected LocalDate dateOfBirth;

    @Column(name = "is_active", nullable = false)
    protected boolean isActive = false;

    @Column(name = "avatar_url", length = 2048)
    protected String avatarUrl;

    @Column(name = "last_login", columnDefinition = "TIMESTAMP")
    protected Instant lastLogin;

    public abstract String getFullRole();
}
