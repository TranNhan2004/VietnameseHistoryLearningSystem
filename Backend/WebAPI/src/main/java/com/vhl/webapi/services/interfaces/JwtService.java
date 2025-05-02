package com.vhl.webapi.services.interfaces;

import io.jsonwebtoken.Claims;

import java.util.function.Function;

public interface JwtService {

    String generateAccessToken(String email, String baseUserId);

    String generateRefreshToken(String email, String baseUserId);

    Boolean validateToken(String token, String email);

    String extractEmail(String token);

    String extractBaseUserId(String token);

    <T> T extractClaim(String token, Function<Claims, T> claimsResolver);
}


