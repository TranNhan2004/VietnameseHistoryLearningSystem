package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.ResetPasswordReqDTO;
import com.vhl.webapi.dtos.requests.UpdatePasswordReqDTO;
import com.vhl.webapi.dtos.requests.UpdateUserInfoReqDTO;
import com.vhl.webapi.dtos.responses.BaseUserResDTO;
import org.springframework.web.multipart.MultipartFile;


public interface BaseUserService {
    BaseUserResDTO getUser(String id);

    void updateInfo(String id, UpdateUserInfoReqDTO updateUserInfoReqDTO);

    void updatePassword(String id, UpdatePasswordReqDTO updatePasswordReqDTO);

    String updateAvatar(String id, MultipartFile file);

    void deleteAvatar(String id);

    void delete(String id);

    void resetPassword(ResetPasswordReqDTO resetPasswordReqDTO);
}
