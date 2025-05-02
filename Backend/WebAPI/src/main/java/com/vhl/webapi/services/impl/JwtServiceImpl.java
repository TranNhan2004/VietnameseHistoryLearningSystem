package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.GeneralErrorCode;
import com.vhl.webapi.constants.errorcodes.JwtErrorCode;
import com.vhl.webapi.services.interfaces.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtServiceImpl implements JwtService {
    private final SecretKey SECRET_KEY;

    private static final long ACCESS_TOKEN_EXPIRATION = 1000 * 60 * 15;
    private static final long REFRESH_TOKEN_EXPIRATION = 1000 * 60 * 60 * 24;

    public JwtServiceImpl(@Value("${jwt.secret-key}") String secretKey) {
        this.SECRET_KEY = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    @Override
    public String generateAccessToken(String email, String baseUserId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("baseUserId", baseUserId);
        return createToken(claims, email, ACCESS_TOKEN_EXPIRATION);
    }

    @Override
    public String generateRefreshToken(String email, String baseUserId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("baseUserId", baseUserId);
        return createToken(claims, email, REFRESH_TOKEN_EXPIRATION);
    }

    private String createToken(Map<String, Object> claims, String subject, long expiration) {
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(subject)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
            .compact();
    }

    @Override
    public Boolean validateToken(String token, String email) {
        final String extractedEmail = extractEmail(token);
        return (extractedEmail.equals(email) && !isTokenExpired(token));
    }

    @Override
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    @Override
    public String extractBaseUserId(String token) {
        return extractClaim(token, claims -> claims.get("baseUserId", String.class));
    }

    @Override
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parser()
                .verifyWith(SECRET_KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            throw new RuntimeException(JwtErrorCode.TOKEN__EXPIRED);
        } catch (io.jsonwebtoken.security.SignatureException e) {
            throw new RuntimeException(JwtErrorCode.TOKEN_SIGNATURE__INVALID);
        } catch (io.jsonwebtoken.MalformedJwtException e) {
            throw new RuntimeException(JwtErrorCode.TOKEN_FORMAT__INVALID);
        } catch (Exception e) {
            throw new RuntimeException(GeneralErrorCode.UNKNOWN_ERROR + e.getMessage());
        }
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}