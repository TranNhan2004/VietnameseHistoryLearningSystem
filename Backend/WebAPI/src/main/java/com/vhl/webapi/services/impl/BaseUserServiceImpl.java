package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.BaseUserErrorCode;
import com.vhl.webapi.constants.errorcodes.GeneralErrorCode;
import com.vhl.webapi.constants.storage.CloudinaryStorageFolder;
import com.vhl.webapi.dtos.requests.UpdatePasswordReqDTO;
import com.vhl.webapi.dtos.requests.UpdateUserInfoReqDTO;
import com.vhl.webapi.dtos.responses.BaseUserResDTO;
import com.vhl.webapi.entities.specific.Admin;
import com.vhl.webapi.entities.specific.BaseUser;
import com.vhl.webapi.entities.specific.Learner;
import com.vhl.webapi.enums.Role;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.mappers.BaseUserMapper;
import com.vhl.webapi.repositories.BaseUserRepository;
import com.vhl.webapi.services.abstraction.BaseUserService;
import com.vhl.webapi.services.abstraction.FileService;
import com.vhl.webapi.utils.cloudinary.CloudinaryUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BaseUserServiceImpl implements BaseUserService {
    private final BaseUserRepository baseUserRepository;
    private final BaseUserMapper baseUserMapper;
    private final FileService fileService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public BaseUserResDTO getUser(String id) {
        BaseUser baseUser = baseUserRepository.findById(id).orElseThrow(
            () -> new NoInstanceFoundException(GeneralErrorCode.NOT_FOUND)
        );
        
        if (baseUser.getFullRole().contains(Role.ADMIN.name())) {
            return baseUserMapper.toAdminResponseDTO((Admin) baseUser);
        } else if (baseUser.getFullRole().contains(Role.LEARNER.name())) {
            return baseUserMapper.toLearnerResponseDTO((Learner) baseUser);
        } else {
            throw new NoInstanceFoundException(GeneralErrorCode.NOT_FOUND);
        }
    }

    @Override
    public void updateInfo(String id, UpdateUserInfoReqDTO updateUserInfoReqDTO) {
        BaseUser baseUser = baseUserRepository.findById(id).orElseThrow(
            () -> new NoInstanceFoundException(GeneralErrorCode.NOT_FOUND)
        );

        baseUser.setFirstName(updateUserInfoReqDTO.getFirstName());
        baseUser.setLastName(updateUserInfoReqDTO.getLastName());
        baseUser.setDateOfBirth(updateUserInfoReqDTO.getDateOfBirth());
        baseUserRepository.save(baseUser);
    }

    @Override
    public void updatePassword(String id, UpdatePasswordReqDTO updatePasswordReqDTO) {
        BaseUser baseUser = baseUserRepository.findById(id).orElseThrow(
            () -> new NoInstanceFoundException(GeneralErrorCode.NOT_FOUND)
        );

        String hashedOldPassword = baseUser.getPassword();
        if (!hashedOldPassword.equals(passwordEncoder.encode(updatePasswordReqDTO.getOldPassword()))) {
            throw new RuntimeException(BaseUserErrorCode.OLD_PASSWORD__INVALID);
        }

        String hashedNewPassword = passwordEncoder.encode(updatePasswordReqDTO.getNewPassword());
        baseUser.setPassword(hashedNewPassword);
        baseUserRepository.save(baseUser);
    }

    @Override
    public void deleteMany(List<String> ids) {
        baseUserRepository.deleteAllById(ids);
    }

    @Override
    public String updateAvatar(String id, MultipartFile file) {
        try {
            BaseUser baseUser = baseUserRepository.findById(id).orElseThrow(
                () -> new NoInstanceFoundException(GeneralErrorCode.NOT_FOUND)
            );

            if (baseUser.getAvatarUrl() != null && !baseUser.getAvatarUrl().isBlank()) {
                fileService.deleteFile(CloudinaryUtils.extractPublicIdFromUrl(baseUser.getAvatarUrl()));
            }

            String url = fileService.uploadFile(file, CloudinaryStorageFolder.USER_AVATAR, "image");

            baseUser.setAvatarUrl(url);
            baseUserRepository.save(baseUser);
            return baseUser.getAvatarUrl();

        } catch (Exception e) {
            throw new RuntimeException(BaseUserErrorCode.AVATAR__UPDATE_FAILED);
        }
    }

    @Override
    public void deleteAvatar(String id) {
        try {
            BaseUser baseUser = baseUserRepository.findById(id).orElseThrow(
                () -> new NoInstanceFoundException(GeneralErrorCode.NOT_FOUND)
            );

            if (!baseUser.getAvatarUrl().isBlank()) {
                fileService.deleteFile(CloudinaryUtils.extractPublicIdFromUrl(baseUser.getAvatarUrl()));
                baseUser.setAvatarUrl(null);
                baseUserRepository.save(baseUser);
            }
        } catch (Exception e) {
            throw new RuntimeException(BaseUserErrorCode.AVATAR__DELETE_FAILED);
        }
    }
}
