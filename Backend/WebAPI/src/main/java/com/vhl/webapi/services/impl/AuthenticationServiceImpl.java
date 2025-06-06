package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.BaseUserErrorCode;
import com.vhl.webapi.constants.regexps.BaseUserRegExp;
import com.vhl.webapi.dtos.requests.*;
import com.vhl.webapi.dtos.responses.BaseUserResDTO;
import com.vhl.webapi.dtos.responses.LoginResDTO;
import com.vhl.webapi.dtos.responses.NewAccessTokenResDTO;
import com.vhl.webapi.entities.specific.Admin;
import com.vhl.webapi.entities.specific.BaseUser;
import com.vhl.webapi.entities.specific.Learner;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.mappers.BaseUserMapper;
import com.vhl.webapi.repositories.BaseUserRepository;
import com.vhl.webapi.services.interfaces.AuthenticationService;
import com.vhl.webapi.services.interfaces.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final BaseUserRepository baseUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final BaseUserMapper baseUserMapper;
    private final JwtService jwtService;

    private static final Pattern EMAIL_PATTERN = Pattern.compile(BaseUserRegExp.EMAIL);

    @Override
    public BaseUserResDTO signup(BaseUserReqDTO baseUserReqDTO) {
        if (baseUserRepository.existsByUserName(baseUserReqDTO.getUserName())) {
            throw new RuntimeException(BaseUserErrorCode.USER_NAME__ALREADY_EXISTS);
        }

        if (baseUserRepository.existsByEmail(baseUserReqDTO.getEmail())) {
            throw new RuntimeException(BaseUserErrorCode.EMAIL__ALREADY_EXISTS);
        }

        BaseUser baseUser;
        BaseUserResDTO baseUserResDTO;

        if (baseUserReqDTO instanceof AdminReqDTO adminDTO) {
            Admin admin = baseUserMapper.toAdmin(adminDTO);
            admin.setPassword(passwordEncoder.encode(adminDTO.getPassword()));
            baseUser = admin;
            baseUserResDTO = baseUserMapper.toAdminResponseDTO(admin);

        } else if (baseUserReqDTO instanceof LearnerReqDTO learnerReqDTO) {
            Learner learner = baseUserMapper.toLearner(learnerReqDTO);
            learner.setPassword(passwordEncoder.encode(learnerReqDTO.getPassword()));
            baseUser = learner;
            baseUserResDTO = baseUserMapper.toLearnerResponseDTO(learner);

        } else {
            throw new IllegalArgumentException(BaseUserErrorCode.ROLE__INVALID);
        }

        BaseUser savedUser = baseUserRepository.save(baseUser);
        baseUserResDTO.setId(savedUser.getId());

        return baseUserResDTO;
    }

    @Override
    public Map<String, Object> login(LoginReqDTO loginReqDTO) {
        String emailOrUserName = loginReqDTO.getEmailOrUserName();
        BaseUser baseUser;

        if (EMAIL_PATTERN.matcher(emailOrUserName).matches()) {
            baseUser = baseUserRepository.findByEmail(emailOrUserName)
                .orElseThrow(() -> new NoInstanceFoundException(BaseUserErrorCode.EMAIL_OR_USER_NAME_OR_PASSWORD__INCORRECT));
        } else {
            baseUser = baseUserRepository.findByUserName(emailOrUserName)
                .orElseThrow(() -> new NoInstanceFoundException(BaseUserErrorCode.EMAIL_OR_USER_NAME_OR_PASSWORD__INCORRECT));
        }

        if (!baseUser.isActive() ||
            !passwordEncoder.matches(loginReqDTO.getPassword(), baseUser.getPassword()) ||
            !baseUser.getFullRole().contains(loginReqDTO.getRole())
        ) {
            throw new NoInstanceFoundException(BaseUserErrorCode.EMAIL_OR_USER_NAME_OR_PASSWORD__INCORRECT);
        }

        String accessToken = jwtService.generateAccessToken(baseUser.getEmail(), baseUser.getId(), baseUser.getFullRole());
        String refreshToken = jwtService.generateRefreshToken(baseUser.getEmail(), baseUser.getId(), baseUser.getFullRole());

        LoginResDTO loginResDTO = new LoginResDTO();
        loginResDTO.setId(baseUser.getId());
        loginResDTO.setEmail(baseUser.getEmail());
        loginResDTO.setUserName(baseUser.getUserName());
        loginResDTO.setFullRole(baseUser.getFullRole());
        loginResDTO.setAccessToken(accessToken);

        baseUser.setLastLogin(Instant.now());
        baseUserRepository.save(baseUser);

        return Map.of("refreshToken", refreshToken, "loginResDTO", loginResDTO);
    }

    @Override
    public NewAccessTokenResDTO getNewAccessToken(RefreshAccessTokenReqDTO refreshAccessTokenReqDTO, String refreshToken) {
        BaseUser baseUser = baseUserRepository.findById(refreshAccessTokenReqDTO.getId()).orElseThrow(
            () -> new NoInstanceFoundException(BaseUserErrorCode.BASE_USER__NOT_FOUND)
        );

        NewAccessTokenResDTO newAccessTokenResDTO = new NewAccessTokenResDTO();

        if (jwtService.validateToken(refreshToken, baseUser.getEmail())) {
            String accessToken = jwtService.generateAccessToken(baseUser.getEmail(), baseUser.getId(), baseUser.getFullRole());
            newAccessTokenResDTO.setAccessToken(accessToken);
        }

        return newAccessTokenResDTO;
    }

}
