package com.vhl.webapi.utils.password.impl;

import com.vhl.webapi.utils.password.interfaces.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BCryptPasswordEncoderImpl implements PasswordEncoder {
    private final BCryptPasswordEncoder encoder;

    public BCryptPasswordEncoderImpl() {
        encoder = new BCryptPasswordEncoder();
    }

    @Override
    public String encode(String rawPassword) {
        return encoder.encode(rawPassword);
    }

    @Override
    public boolean matches(String rawPassword, String encodedPassword) {
        return encoder.matches(rawPassword, encodedPassword);
    }
}
