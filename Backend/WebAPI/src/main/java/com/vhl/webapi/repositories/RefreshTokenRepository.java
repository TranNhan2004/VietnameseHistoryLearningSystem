package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {
    Optional<RefreshToken> findByToken(String token);

    void deleteByBaseUserId(String baseUserId);
}