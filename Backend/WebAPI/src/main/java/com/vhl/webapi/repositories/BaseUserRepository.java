package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.BaseUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BaseUserRepository extends JpaRepository<BaseUser, String> {
    Optional<BaseUser> findByUserName(String userName);

    Optional<BaseUser> findByEmail(String email);

    boolean existsByUserName(String userName);

    boolean existsByEmail(String email);
}