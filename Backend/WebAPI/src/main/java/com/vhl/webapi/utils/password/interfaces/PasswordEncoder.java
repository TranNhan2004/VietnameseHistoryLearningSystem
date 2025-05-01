package com.vhl.webapi.utils.password.interfaces;

public interface PasswordEncoder {
    public String encode(String rawPassword);

    public boolean matches(String rawPassword, String encodedPassword);
}
