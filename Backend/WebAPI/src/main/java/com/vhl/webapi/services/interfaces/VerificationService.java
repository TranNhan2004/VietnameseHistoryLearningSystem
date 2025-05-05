package com.vhl.webapi.services.interfaces;

import com.vhl.webapi.dtos.requests.SendOtpDTO;
import com.vhl.webapi.dtos.requests.VerificationDTO;

public interface VerificationService {
    void sendOtpForVerifyAccount(SendOtpDTO sendOtpDTO);
    
    void sendOtpForVerifyResetPassword(SendOtpDTO sendOtpDTO);

    boolean verifyAccount(VerificationDTO verificationDTO);

    boolean verifyResetPassword(VerificationDTO verificationDTO);
}
