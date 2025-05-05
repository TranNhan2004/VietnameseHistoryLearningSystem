package com.vhl.webapi.controllers;

import com.vhl.webapi.constants.keys.RedisKeyPrefix;
import com.vhl.webapi.services.interfaces.EmailService;
import com.vhl.webapi.services.interfaces.OtpService;
import com.vhl.webapi.services.interfaces.RedisService;
import com.vhl.webapi.services.interfaces.VerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/verify")
public class VerificationController {
    private final RedisService<String, String> redisService;
    private final OtpService otpService;
    private final EmailService emailService;
    private final VerificationService verificationService;

    @PostMapping("/account/send-otp")
    public ResponseEntity<?> sendOtpForVerifyAccount(@RequestParam String email, @RequestParam String userName) {
        String otp = otpService.generate(10, false);
        Map<String, String> placeholders = new HashMap<>();
        placeholders.put("USER_NAME", userName);
        placeholders.put("OTP_CODE", otp);
        placeholders.put("EXPIRATION_TIME", "10");

        try {
            emailService.sendHtmlEmail(
                email,
                "XÁC THỰC TÀI KHOẢN",
                "verify-account.html",
                placeholders);
            redisService.set(RedisKeyPrefix.USER_VERIFY_ACCOUNT + email, otp, Duration.ofMinutes(10));
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok("Send OTP successfully!");
    }
}
