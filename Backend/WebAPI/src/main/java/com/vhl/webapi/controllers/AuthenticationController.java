package com.vhl.webapi.controllers;

import com.vhl.webapi.constants.errorcodes.JwtErrorCode;
import com.vhl.webapi.dtos.requests.BaseUserReqDTO;
import com.vhl.webapi.dtos.requests.LoginReqDTO;
import com.vhl.webapi.dtos.requests.LogoutReqDTO;
import com.vhl.webapi.dtos.requests.RefreshAccessTokenReqDTO;
import com.vhl.webapi.dtos.responses.BaseUserResDTO;
import com.vhl.webapi.dtos.responses.LoginResDTO;
import com.vhl.webapi.dtos.responses.NewAccessTokenResDTO;
import com.vhl.webapi.enums.Role;
import com.vhl.webapi.services.interfaces.AuthenticationService;
import com.vhl.webapi.utils.datatypes.Pair;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
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

    private final String ADMIN_RT_COOKIE_NAME = "SNFna6Jowt4GVwad3PaQT8rGRuMoML8iVpI5JQcZ37A";
    private final String LEARNER_RT_COOKIE_NAME = "8z9gxny6rFLJ7vdzwUAthZVKMLQJNPtkngrI8I-UxmQ";

    private String getCookieName(String roleOrFullRole) {
        if (roleOrFullRole.contains(Role.ADMIN.name())) {
            return ADMIN_RT_COOKIE_NAME;
        }

        if (roleOrFullRole.contains(Role.LEARNER.name())) {
            return LEARNER_RT_COOKIE_NAME;
        }

        return null;
    }

    private Cookie getCookie(HttpServletRequest request, String cookieName) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(cookieName)) {
                    return cookie;
                }
            }
        }

        return null;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody BaseUserReqDTO baseUserReqDTO) {
        BaseUserResDTO data = authenticationService.signup(baseUserReqDTO);
        return ResponseEntity.ok(data);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginReqDTO loginReqDTO) {
        Pair<String, LoginResDTO> pair = authenticationService.login(loginReqDTO);
        String refreshToken = pair.getFirst();
        String cookieName = getCookieName(loginReqDTO.getRole());

        ResponseCookie cookie = ResponseCookie.from(cookieName, refreshToken)
            .maxAge(24 * 60 * 60)
            .path("/")
            .httpOnly(true)
            .secure(true)
            .sameSite("None")
            .build();

        return ResponseEntity.ok()
            .header("Set-Cookie", cookie.toString())
            .body(pair.getSecond());
    }


    @PostMapping("/token/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request, @Valid @RequestBody RefreshAccessTokenReqDTO refreshAccessTokenReqDTO) {
        String cookieName = getCookieName(refreshAccessTokenReqDTO.getFullRole());
        Cookie cookie = getCookie(request, cookieName);

        if (cookie != null) {
            String refreshToken = cookie.getValue();
            NewAccessTokenResDTO newAccessTokenResDTO =
                authenticationService.getNewAccessToken(refreshAccessTokenReqDTO, refreshToken);
            return ResponseEntity.ok(newAccessTokenResDTO);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(JwtErrorCode.TOKEN__EXPIRED);
    }


    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@Valid @RequestBody LogoutReqDTO logoutReqDTO) {
        String cookieName = getCookieName(logoutReqDTO.getFullRole());
        ResponseCookie cookie = ResponseCookie.from(cookieName, "")
            .maxAge(0)
            .path("/")
            .httpOnly(true)
            .secure(true)
            .sameSite("None")
            .build();

        return ResponseEntity.ok()
            .header("Set-Cookie", cookie.toString())
            .build();
    }

}
