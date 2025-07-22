package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.BaseUserErrorCode;
import com.vhl.webapi.constants.errorcodes.GeneralErrorCode;
import com.vhl.webapi.constants.errorcodes.VerificationErrorCode;
import com.vhl.webapi.constants.keys.RedisKeyPrefix;
import com.vhl.webapi.dtos.requests.SendOtpReqDTO;
import com.vhl.webapi.dtos.requests.VerificationReqDTO;
import com.vhl.webapi.entities.specific.BaseUser;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.repositories.BaseUserRepository;
import com.vhl.webapi.services.abstraction.EmailService;
import com.vhl.webapi.services.abstraction.OtpService;
import com.vhl.webapi.services.abstraction.SSRedisService;
import com.vhl.webapi.services.abstraction.VerificationService;
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

    private void sendOtp(SendOtpReqDTO sendOtpReqDTO, String emailSubject,
                         String emailTemplatePath, String redisKeyPrefix) {
        String otp = otpService.generate(10, false);
        String hashedOtp = SHA256.hashes(otp);
        Map<String, String> placeholders = new HashMap<>();
        placeholders.put("otpCode", otp);
        placeholders.put("expirationTime", "10");

        try {
            emailService.sendHtmlEmail(sendOtpReqDTO.getEmail(), emailSubject, emailTemplatePath, placeholders);
            ssRedisService.set(redisKeyPrefix + sendOtpReqDTO.getEmail(), hashedOtp, Duration.ofMinutes(10));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private boolean verify(String redisKeyPrefix, VerificationReqDTO verificationReqDTO) {
        String key = redisKeyPrefix + verificationReqDTO.getEmail();
        String value = ssRedisService.get(key).orElseThrow(
            () -> new RuntimeException(VerificationErrorCode.OTP__EXPIRED)
        );

        if (!SHA256.matches(verificationReqDTO.getOtp(), value)) {
            throw new RuntimeException(VerificationErrorCode.OTP__INVALID);
        }

        ssRedisService.delete(key);
        return true;
    }


    @Override
    public void sendOtpForVerifyAccount(SendOtpReqDTO sendOtpReqDTO) {
        BaseUser baseUser = baseUserRepository.findByEmail(sendOtpReqDTO.getEmail()).orElseThrow(
            () -> new NoInstanceFoundException(GeneralErrorCode.NOT_FOUND)
        );

        if (baseUser.getActive()) {
            throw new RuntimeException(BaseUserErrorCode.HAS_BEEN_ACTIVE);
        }

        sendOtp(
            sendOtpReqDTO,
            "XÁC THỰC TÀI KHOẢN",
            "verify-account.html",
            RedisKeyPrefix.USER_VERIFY_ACCOUNT
        );
    }

    @Override
    public void sendOtpForVerifyResetPassword(SendOtpReqDTO sendOtpReqDTO) {
        if (!baseUserRepository.existsByEmail(sendOtpReqDTO.getEmail())) {
            throw new NoInstanceFoundException(GeneralErrorCode.NOT_FOUND);
        }

        sendOtp(
            sendOtpReqDTO,
            "ĐẶT LẠI MẬT KHẨU",
            "reset-password.html",
            RedisKeyPrefix.USER_VERIFY_RESET_PASSWORD
        );
    }

    @Override
    public boolean verifyAccount(VerificationReqDTO verificationReqDTO) {
        BaseUser baseUser = baseUserRepository.findByEmail(verificationReqDTO.getEmail()).orElseThrow(
            () -> new NoInstanceFoundException(GeneralErrorCode.NOT_FOUND)
        );

        if (baseUser.getActive()) {
            throw new RuntimeException(BaseUserErrorCode.HAS_BEEN_ACTIVE);
        }

        if (!verify(RedisKeyPrefix.USER_VERIFY_ACCOUNT, verificationReqDTO)) {
            return false;
        }

        baseUser.setActive(true);
        baseUserRepository.save(baseUser);
        return true;
    }

    @Override
    public boolean verifyResetPassword(VerificationReqDTO verificationReqDTO) {
        return verify(RedisKeyPrefix.USER_VERIFY_RESET_PASSWORD, verificationReqDTO);
    }
}
