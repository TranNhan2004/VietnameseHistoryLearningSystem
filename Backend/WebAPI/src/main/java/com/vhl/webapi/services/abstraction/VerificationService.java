package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.SendOtpReqDTO;
import com.vhl.webapi.dtos.requests.VerificationReqDTO;

public interface VerificationService {
    void sendOtpForVerifyAccount(SendOtpReqDTO sendOtpReqDTO);

    void sendOtpForVerifyResetPassword(SendOtpReqDTO sendOtpReqDTO);

    boolean verifyAccount(VerificationReqDTO verificationReqDTO);

    boolean verifyResetPassword(VerificationReqDTO verificationReqDTO);
}
