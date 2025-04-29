package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, String> {

}