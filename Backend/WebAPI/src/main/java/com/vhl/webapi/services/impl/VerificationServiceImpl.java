package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.BaseUserErrorCode;
import com.vhl.webapi.constants.errorcodes.VerificationErrorCode;
import com.vhl.webapi.constants.keys.RedisKeyPrefix;
import com.vhl.webapi.dtos.requests.SendOtpDTO;
import com.vhl.webapi.dtos.requests.VerificationDTO;
import com.vhl.webapi.entities.specific.BaseUser;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.repositories.BaseUserRepository;
import com.vhl.webapi.services.interfaces.EmailService;
import com.vhl.webapi.services.interfaces.OtpService;
import com.vhl.webapi.services.interfaces.SSRedisService;
import com.vhl.webapi.services.interfaces.VerificationService;
import com.vhl.webapi.utils.hash.SHA256;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class VerificationServiceImpl implements VerificationService {

    private final OtpService otpService;
    private final EmailService emailService;
    private final SSRedisService ssRedisService;
    private final BaseUserRepository baseUserRepository;

    private void sendOtp(SendOtpDTO sendOtpDTO, String emailSubject,
                         String emailTemplatePath, String redisKeyPrefix) {
        String otp = otpService.generate(10, false);
        String hashedOtp = SHA256.hashes(otp);
        Map<String, String> placeholders = new HashMap<>();
        placeholders.put("USER_NAME", sendOtpDTO.getUserName());
        placeholders.put("OTP_CODE", otp);
        placeholders.put("EXPIRATION_TIME", "10");

        try {
            emailService.sendHtmlEmail(sendOtpDTO.getEmail(), emailSubject, emailTemplatePath, placeholders);
            ssRedisService.set(redisKeyPrefix + sendOtpDTO.getEmail(), hashedOtp, Duration.ofMinutes(10));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private boolean verify(String redisKeyPrefix, VerificationDTO verificationDTO) {
        String key = redisKeyPrefix + verificationDTO.getEmail();
        String value = ssRedisService.get(key).orElseThrow(
            () -> new RuntimeException(VerificationErrorCode.OTP__EXPIRED)
        );

        if (!SHA256.matches(verificationDTO.getOtp(), value)) {
            throw new RuntimeException(VerificationErrorCode.OTP__INVALID);
        }

        return true;
    }


    @Override
    public void sendOtpForVerifyAccount(SendOtpDTO sendOtpDTO) {
        BaseUser baseUser = baseUserRepository.findByEmail(sendOtpDTO.getEmail()).orElseThrow(
            () -> new NoInstanceFoundException(BaseUserErrorCode.BASE_USER__NOT_FOUND)
        );

        if (baseUser.isActive()) {
            throw new RuntimeException(BaseUserErrorCode.HAS_BEEN_ACTIVE);
        }
        
        sendOtp(
            sendOtpDTO,
            "XÁC THỰC TÀI KHOẢN",
            "verify-account.html",
            RedisKeyPrefix.USER_VERIFY_ACCOUNT
        );
    }

    @Override
    public void sendOtpForVerifyResetPassword(SendOtpDTO sendOtpDTO) {
        sendOtp(
            sendOtpDTO,
            "ĐẶT LẠI MẬT KHẨU",
            "reset-password.html",
            RedisKeyPrefix.USER_VERIFY_RESET_PASSWORD
        );
    }

    @Override
    public boolean verifyAccount(VerificationDTO verificationDTO) {
        BaseUser baseUser = baseUserRepository.findByEmail(verificationDTO.getEmail()).orElseThrow(
            () -> new NoInstanceFoundException(BaseUserErrorCode.BASE_USER__NOT_FOUND)
        );

        if (baseUser.isActive()) {
            throw new RuntimeException(BaseUserErrorCode.HAS_BEEN_ACTIVE);
        }

        if (!verify(RedisKeyPrefix.USER_VERIFY_ACCOUNT, verificationDTO)) {
            return false;
        }

        baseUser.setActive(true);
        baseUserRepository.save(baseUser);
        return true;
    }

    @Override
    public boolean verifyResetPassword(VerificationDTO verificationDTO) {
        return verify(RedisKeyPrefix.USER_VERIFY_RESET_PASSWORD, verificationDTO);
    }
}
