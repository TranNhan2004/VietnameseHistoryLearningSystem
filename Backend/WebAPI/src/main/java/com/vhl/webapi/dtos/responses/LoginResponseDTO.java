package com.vhl.webapi.dtos.responses;

import lombok.Data;

@Data
public class LoginResponseDTO {
    private String id;
    private String email;
    private String userName;
    private String fullRole;
    private String accessToken;
}
