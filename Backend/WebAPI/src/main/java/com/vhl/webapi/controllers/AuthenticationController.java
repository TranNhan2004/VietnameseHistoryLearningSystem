package com.vhl.webapi.controllers;

import com.vhl.webapi.dtos.requests.BaseUserDTO;
import com.vhl.webapi.dtos.requests.LoginDTO;
import com.vhl.webapi.dtos.responses.BaseUserResponseDTO;
import com.vhl.webapi.dtos.responses.LoginResponseDTO;
import com.vhl.webapi.services.interfaces.AuthenticationService;
import com.vhl.webapi.utils.Pair;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    private final static String ADMIN_RT_COOKIE_NAME = "admin_rt";
    private final static String LEARNER_RT_COOKIE_NAME = "learner_rt";

    private String getCookieName(String type) {
        return switch (type) {
            case "ADMIN" -> ADMIN_RT_COOKIE_NAME;
            case "LEARNER" -> LEARNER_RT_COOKIE_NAME;
            default -> "";
        };
    }

    public String getRefreshTokenFromRequest(HttpServletRequest request, String cookieName) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(cookieName)) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }


    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody BaseUserDTO baseUserDTO) {
        BaseUserResponseDTO data = authenticationService.signup(baseUserDTO);
        return ResponseEntity.ok(data);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginDTO, HttpServletResponse response) {

        Pair<String, LoginResponseDTO> pair = authenticationService.login(loginDTO);
        String cookieName = getCookieName(loginDTO.getType());

        Cookie refreshTokenCookie = new Cookie(cookieName, pair.getFirst());
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(24 * 60 * 60);

        response.addCookie(refreshTokenCookie);

        return ResponseEntity.ok(pair.getSecond());
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request, @RequestParam String id, @RequestParam String type) {
        String cookieName = getCookieName(type);
        String refreshToken = getRefreshTokenFromRequest(request, cookieName);
        LoginResponseDTO loginResponseDTO = authenticationService.getNewAccessToken(refreshToken, id);
        return ResponseEntity.ok(loginResponseDTO);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestParam String type, HttpServletResponse response) {
        String cookieName = getCookieName(type);

        Cookie deleteCookie = new Cookie(cookieName, "");
        deleteCookie.setHttpOnly(true);
        deleteCookie.setSecure(true);
        deleteCookie.setPath("/");
        deleteCookie.setMaxAge(0);

        response.addCookie(deleteCookie);

        return ResponseEntity.ok().build();
    }
}
