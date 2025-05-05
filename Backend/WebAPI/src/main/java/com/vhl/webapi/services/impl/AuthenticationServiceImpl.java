package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.BaseUserErrorCode;
import com.vhl.webapi.constants.errorcodes.JwtErrorCode;
import com.vhl.webapi.constants.regexps.BaseUserRegExp;
import com.vhl.webapi.dtos.requests.AdminDTO;
import com.vhl.webapi.dtos.requests.BaseUserDTO;
import com.vhl.webapi.dtos.requests.LearnerDTO;
import com.vhl.webapi.dtos.requests.LoginDTO;
import com.vhl.webapi.dtos.responses.BaseUserResponseDTO;
import com.vhl.webapi.dtos.responses.LoginResponseDTO;
import com.vhl.webapi.entities.specific.Admin;
import com.vhl.webapi.entities.specific.BaseUser;
import com.vhl.webapi.entities.specific.Learner;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.mappers.BaseUserMapper;
import com.vhl.webapi.repositories.BaseUserRepository;
import com.vhl.webapi.services.interfaces.AuthenticationService;
import com.vhl.webapi.services.interfaces.JwtService;
import com.vhl.webapi.utils.types.Pair;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final BaseUserRepository baseUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final BaseUserMapper baseUserMapper;
    private final JwtService jwtService;

    private static final Pattern EMAIL_PATTERN = Pattern.compile(BaseUserRegExp.EMAIL);

    @Override
    public BaseUserResponseDTO signup(BaseUserDTO baseUserDTO) {
        if (baseUserRepository.existsByUserName(baseUserDTO.getUserName())) {
            throw new RuntimeException(BaseUserErrorCode.USER_NAME__ALREADY_EXISTS);
        }

        if (baseUserRepository.existsByEmail(baseUserDTO.getEmail())) {
            throw new RuntimeException(BaseUserErrorCode.EMAIL__ALREADY_EXISTS);
        }

        BaseUser baseUser;
        BaseUserResponseDTO baseUserResponseDTO;

        if (baseUserDTO instanceof AdminDTO adminDTO) {
            Admin admin = baseUserMapper.toAdmin(adminDTO);
            admin.setPassword(passwordEncoder.encode(adminDTO.getPassword()));
            baseUser = admin;
            baseUserResponseDTO = baseUserMapper.toAdminResponseDTO(admin);

        } else if (baseUserDTO instanceof LearnerDTO learnerDTO) {
            Learner learner = baseUserMapper.toLearner(learnerDTO);
            learner.setPassword(passwordEncoder.encode(learnerDTO.getPassword()));
            baseUser = learner;
            baseUserResponseDTO = baseUserMapper.toLearnerResponseDTO(learner);

        } else {
            throw new IllegalArgumentException(BaseUserErrorCode.ROLE__INVALID);
        }

        BaseUser savedUser = baseUserRepository.save(baseUser);
        baseUserResponseDTO.setId(savedUser.getId());

        return baseUserResponseDTO;
    }

    @Override
    public Pair<String, LoginResponseDTO> login(LoginDTO loginDTO) {
        String emailOrUserName = loginDTO.getEmailOrUserName();
        BaseUser baseUser;

        if (EMAIL_PATTERN.matcher(emailOrUserName).matches()) {
            baseUser = baseUserRepository.findByEmail(emailOrUserName)
                .orElseThrow(() -> new NoInstanceFoundException(BaseUserErrorCode.EMAIL_OR_USER_NAME_OR_PASSWORD__INCORRECT));
        } else {
            baseUser = baseUserRepository.findByUserName(emailOrUserName)
                .orElseThrow(() -> new NoInstanceFoundException(BaseUserErrorCode.EMAIL_OR_USER_NAME_OR_PASSWORD__INCORRECT));
        }

        if (!baseUser.isActive() && !passwordEncoder.matches(loginDTO.getPassword(), baseUser.getPassword())) {
            throw new NoInstanceFoundException(BaseUserErrorCode.EMAIL_OR_USER_NAME_OR_PASSWORD__INCORRECT);
        }

        String accessToken = jwtService.generateAccessToken(baseUser.getEmail(), baseUser.getId(), baseUser.getFullRole());
        String refreshToken = jwtService.generateRefreshToken(baseUser.getEmail(), baseUser.getId(), baseUser.getFullRole());

        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
        loginResponseDTO.setId(baseUser.getId());
        loginResponseDTO.setEmail(baseUser.getEmail());
        loginResponseDTO.setUserName(baseUser.getUserName());
        loginResponseDTO.setAccessToken(accessToken);

        return new Pair<>(refreshToken, loginResponseDTO);
    }

    @Override
    public LoginResponseDTO getNewAccessToken(String refreshToken, String baseUserId) {
        if (refreshToken == null || refreshToken.isBlank()) {
            throw new RuntimeException(JwtErrorCode.TOKEN__REQUIRED);
        }

        if (baseUserId == null || baseUserId.isBlank()) {
            throw new RuntimeException(BaseUserErrorCode.ID__REQUIRED);
        }

        BaseUser baseUser = baseUserRepository.findById(baseUserId).orElseThrow(
            () -> new NoInstanceFoundException(BaseUserErrorCode.BASE_USER__NOT_FOUND)
        );

        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();

        if (jwtService.validateToken(refreshToken, baseUser.getEmail())) {
            String accessToken = jwtService.generateAccessToken(baseUser.getEmail(), baseUser.getId(), baseUser.getFullRole());
            loginResponseDTO.setId(baseUser.getId());
            loginResponseDTO.setEmail(baseUser.getEmail());
            loginResponseDTO.setUserName(baseUser.getUserName());
            loginResponseDTO.setAccessToken(accessToken);
        }

        return loginResponseDTO;
    }
}
