package com.vhl.webapi.controllers;

import com.vhl.webapi.dtos.requests.BaseUserDTO;
import com.vhl.webapi.dtos.requests.LoginDTO;
import com.vhl.webapi.dtos.requests.LogoutDTO;
import com.vhl.webapi.dtos.requests.RefreshAccessTokenDTO;
import com.vhl.webapi.dtos.responses.BaseUserResponseDTO;
import com.vhl.webapi.dtos.responses.LoginResponseDTO;
import com.vhl.webapi.services.interfaces.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody BaseUserDTO baseUserDTO) {
        BaseUserResponseDTO data = authenticationService.signup(baseUserDTO);
        return ResponseEntity.ok(data);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginDTO) {
        LoginResponseDTO loginResponseDTO = authenticationService.login(loginDTO);
        return ResponseEntity.ok(loginResponseDTO);
    }

    @PostMapping("/token/refresh")
    public ResponseEntity<?> refresh(@Valid @RequestBody RefreshAccessTokenDTO refreshAccessTokenDTO) {
        LoginResponseDTO loginResponseDTO = authenticationService.getNewAccessToken(refreshAccessTokenDTO);
        return ResponseEntity.ok(loginResponseDTO);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@Valid @RequestBody LogoutDTO logoutDTO) {
        authenticationService.logout(logoutDTO);
        return ResponseEntity.ok().build();
    }
}
