package com.vhl.webapi.utils.password.impl;

import com.vhl.webapi.utils.password.interfaces.PasswordUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordUtilsImpl implements PasswordUtils {
    private final BCryptPasswordEncoder encoder;

    public PasswordUtilsImpl() {
        encoder = new BCryptPasswordEncoder();
    }

    public String hashPassword(String rawPassword) {
        return encoder.encode(rawPassword);
    }

    public boolean verifyPassword(String rawPassword, String hashedPassword) {
        return encoder.matches(rawPassword, hashedPassword);
    }
}