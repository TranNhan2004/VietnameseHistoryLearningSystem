package com.vhl.webapi.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.vhl.webapi.services.abstraction.FileService;
import com.vhl.webapi.utils.cloudinary.CloudinaryUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryFileServiceImpl implements FileService {
    private final Cloudinary cloudinary;

    @Override
    public String uploadFile(MultipartFile file, String folder, String resourceType) throws IOException {
        String safeFileName = CloudinaryUtils.normalizeFileName(file.getOriginalFilename());

        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
            ObjectUtils.asMap(
                "public_id", folder + "/" + safeFileName,
                "resource_type", resourceType
            ));

        String publicId = (String) uploadResult.get("public_id");

        var urlBuilder = cloudinary.url()
            .secure(true)
            .resourceType(resourceType)
            .publicId(publicId);

        if ("image".equals(resourceType)) {
            urlBuilder.transformation(new Transformation()
                .quality("auto")
                .fetchFormat("auto"));
        }

        return urlBuilder.generate();
    }


    @Override
    public void deleteFile(String fileId) throws IOException {
        cloudinary.uploader().destroy(fileId, ObjectUtils.emptyMap());
    }
}
