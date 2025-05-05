package com.vhl.webapi.services.impl;

import com.vhl.webapi.services.interfaces.VerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VerificationServiceImpl implements VerificationService {
    private boolean verify(String redisKeyPrefix, String email, String otp) {
        return false;
    }

    
    @Override
    public boolean verifyAccount(String email, String otp) {
        return false;
    }

    @Override
    public boolean verifyResetPassword(String email, String otp) {
        return false;
    }
}
