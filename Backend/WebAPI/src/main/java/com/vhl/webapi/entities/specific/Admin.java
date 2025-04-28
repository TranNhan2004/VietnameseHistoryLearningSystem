package com.vhl.webapi.entities.specific;

import com.vhl.webapi.enums.AdminLevel;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "admins")
@PrimaryKeyJoinColumn(name = "id")
public class Admin extends BaseUser {
    @Enumerated(EnumType.STRING)
    @Column(name = "admin_level", nullable = false)
    private AdminLevel adminLevel;

}
