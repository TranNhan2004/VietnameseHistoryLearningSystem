package com.vhl.webapi.dtos.responses;

import lombok.Data;

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
}
