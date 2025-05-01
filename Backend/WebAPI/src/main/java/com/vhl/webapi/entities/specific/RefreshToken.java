package com.vhl.webapi.entities.specific;

import com.vhl.webapi.entities.superclass.IBaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Entity
@Data
@Table(name = "refresh_tokens")
public class RefreshToken extends IBaseEntity {
    @Column(name = "token", nullable = false, unique = true)
    private String token;

    @ManyToOne
    @JoinColumn(name = "base_user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private BaseUser baseUser;

    @Column(name = "expired_at", nullable = false, columnDefinition = "TIMESTAMP")
    private Instant expiredAt;
}
