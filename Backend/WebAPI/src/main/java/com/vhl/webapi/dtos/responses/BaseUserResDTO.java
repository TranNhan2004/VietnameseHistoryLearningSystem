package com.vhl.webapi.dtos.responses;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;

@Data
public abstract class BaseUserResDTO {
    protected String id;
    protected String userName;
    protected String email;
    protected String firstName;
    protected String lastName;
    protected LocalDate dateOfBirth;
    protected String avatarUrl;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    protected Instant createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    protected Instant updatedAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    protected Instant lastLogin;
}
