package com.vhl.webapi.controllers;

import com.vhl.webapi.dtos.requests.SendOtpDTO;
import com.vhl.webapi.dtos.requests.VerificationDTO;
import com.vhl.webapi.services.interfaces.VerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/verify")
public class VerificationController {
    private final VerificationService verificationService;

    @PostMapping("/account/send-otp")
    public ResponseEntity<?> sendOtpForVerifyAccount(@RequestBody SendOtpDTO sendOtpDTO) {
        verificationService.sendOtpForVerifyAccount(sendOtpDTO);
        return ResponseEntity.ok("Send OTP successfully!");
    }

    @PostMapping("/account")
    public ResponseEntity<?> verifyAccount(@RequestBody VerificationDTO verificationDTO) {
        verificationService.verifyAccount(verificationDTO);
        return ResponseEntity.ok("Verify account successfully!");
    }

}
