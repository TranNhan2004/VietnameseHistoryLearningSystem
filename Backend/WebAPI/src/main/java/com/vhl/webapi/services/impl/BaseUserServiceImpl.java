package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.BaseUserErrorCode;
import com.vhl.webapi.constants.errorcodes.GeneralErrorCode;
import com.vhl.webapi.constants.storage.CloudinaryStorageFolder;
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
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class BaseUserServiceImpl implements BaseUserService {
    private final BaseUserRepository baseUserRepository;
    private final BaseUserMapper baseUserMapper;
    private final FileService fileService;
    
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
