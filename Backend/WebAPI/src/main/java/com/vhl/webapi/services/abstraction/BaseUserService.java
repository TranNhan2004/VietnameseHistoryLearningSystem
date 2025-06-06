package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.responses.BaseUserResDTO;
import org.springframework.web.multipart.MultipartFile;

public interface BaseUserService {
    BaseUserResDTO getUser(String id);

    String updateAvatar(String id, MultipartFile file);

    void deleteAvatar(String id);
}
