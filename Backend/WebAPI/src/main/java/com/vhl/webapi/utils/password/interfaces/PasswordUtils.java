package com.vhl.webapi.utils.password.interfaces;

public interface PasswordUtils {
    public String hashPassword(String rawPassword);

    public boolean verifyPassword(String hashedPassword, String rawPassword);
}
