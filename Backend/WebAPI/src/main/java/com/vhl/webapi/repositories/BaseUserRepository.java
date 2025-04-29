package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.BaseUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BaseUserRepository extends JpaRepository<BaseUser, String> {

}