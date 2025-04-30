package com.vhl.webapi.utils.password.interfaces;

import org.springframework.stereotype.Component;

@Component
public interface PasswordUtils {
    public String hashPassword(String rawPassword);

    public boolean verifyPassword(String hashedPassword, String rawPassword);
}
