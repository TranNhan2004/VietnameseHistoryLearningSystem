package com.vhl.webapi.services.interfaces;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {
    String uploadFile(MultipartFile file, String folder, String resourceType) throws IOException;

    void deleteFile(String fileId) throws IOException;
}
