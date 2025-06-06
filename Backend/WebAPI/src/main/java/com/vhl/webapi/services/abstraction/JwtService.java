package com.vhl.webapi.services.abstraction;

public interface JwtService {

    String generateAccessToken(String email, String baseUserId, String fullRole);

    String generateRefreshToken(String email, String baseUserId, String fullRole);

    boolean validateToken(String token, String email);

    String extractEmail(String token);

    String extractBaseUserId(String token);

    String extractFullRole(String token);

}


