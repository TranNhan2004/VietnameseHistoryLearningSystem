package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.UpdatePasswordReqDTO;
import com.vhl.webapi.dtos.requests.UpdateUserInfoReqDTO;
import com.vhl.webapi.dtos.responses.BaseUserResDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface BaseUserService {
    BaseUserResDTO getUser(String id);

    void updateInfo(String id, UpdateUserInfoReqDTO updateUserInfoReqDTO);

    void updatePassword(String id, UpdatePasswordReqDTO updatePasswordReqDTO);

    void deleteMany(List<String> ids);

    String updateAvatar(String id, MultipartFile file);

    void deleteAvatar(String id);
}
