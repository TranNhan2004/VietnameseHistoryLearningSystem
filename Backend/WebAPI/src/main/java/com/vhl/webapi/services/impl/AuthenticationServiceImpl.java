package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.BaseUserErrorCode;
import com.vhl.webapi.dtos.requests.AdminDTO;
import com.vhl.webapi.dtos.requests.BaseUserDTO;
import com.vhl.webapi.dtos.requests.LearnerDTO;
import com.vhl.webapi.dtos.requests.LoginDTO;
import com.vhl.webapi.dtos.responses.BaseUserResponseDTO;
import com.vhl.webapi.dtos.responses.LoginResponseDTO;
import com.vhl.webapi.entities.specific.Admin;
import com.vhl.webapi.entities.specific.BaseUser;
import com.vhl.webapi.entities.specific.Learner;
import com.vhl.webapi.mappers.BaseUserMapper;
import com.vhl.webapi.repositories.BaseUserRepository;
import com.vhl.webapi.services.interfaces.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final BaseUserRepository baseUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final BaseUserMapper baseUserMapper;


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
            throw new IllegalArgumentException(BaseUserErrorCode.TYPE__INVALID);
        }

        BaseUser savedUser = baseUserRepository.save(baseUser);
        baseUserResponseDTO.setId(savedUser.getId());

        return baseUserResponseDTO;
    }

    @Override
    public LoginResponseDTO login(LoginDTO loginDTO) {
        return null;
    }
}
