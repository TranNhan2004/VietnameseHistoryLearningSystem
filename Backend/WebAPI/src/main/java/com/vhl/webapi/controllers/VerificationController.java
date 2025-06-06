package com.vhl.webapi.controllers;

import com.vhl.webapi.dtos.requests.SendOtpReqDTO;
import com.vhl.webapi.dtos.requests.VerificationReqDTO;
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
    public ResponseEntity<?> sendOtpForVerifyAccount(@RequestBody SendOtpReqDTO sendOtpReqDTO) {
        verificationService.sendOtpForVerifyAccount(sendOtpReqDTO);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/account")
    public ResponseEntity<?> verifyAccount(@RequestBody VerificationReqDTO verificationReqDTO) {
        verificationService.verifyAccount(verificationReqDTO);
        return ResponseEntity.noContent().build();
    }

}
