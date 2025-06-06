package com.vhl.webapi.services.interfaces;

import org.springframework.web.multipart.MultipartFile;

public interface BaseUserService {
    String updateAvatar(String id, MultipartFile file);

    void deleteAvatar(String id);
}
