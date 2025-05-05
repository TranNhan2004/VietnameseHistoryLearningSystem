package com.vhl.webapi.services.interfaces;

public interface VerificationService {

    boolean verifyAccount(String email, String otp);

    boolean verifyResetPassword(String email, String otp);
}
