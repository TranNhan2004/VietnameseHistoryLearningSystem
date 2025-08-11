package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.ResetPasswordReqDTO;
import com.vhl.webapi.dtos.requests.UpdatePasswordReqDTO;
import com.vhl.webapi.dtos.requests.UpdateUserInfoReqDTO;
import com.vhl.webapi.dtos.responses.AvatarResDTO;
import com.vhl.webapi.dtos.responses.BaseUserResDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface BaseUserService {
    List<BaseUserResDTO> getAllUsers();

    List<BaseUserResDTO> getUsersByRole(String role);

    BaseUserResDTO getUserById(String id);

    void updateInfo(String id, UpdateUserInfoReqDTO updateUserInfoReqDTO);

    void updatePassword(String id, UpdatePasswordReqDTO updatePasswordReqDTO);

    AvatarResDTO uploadAvatar(String id, MultipartFile file);

    void deleteAvatar(String id);

    void delete(String id);

    void resetPassword(ResetPasswordReqDTO resetPasswordReqDTO);

    void lock(String id);
    
    void unlock(String id);
}
