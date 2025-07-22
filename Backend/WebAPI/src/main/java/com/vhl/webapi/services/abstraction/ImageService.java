package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.ImageReqDTO;
import com.vhl.webapi.dtos.responses.ImageResDTO;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    ImageResDTO createImage(ImageReqDTO imageReqDTO);

    void updateImage(String id, ImageReqDTO imageReqDTO);

    void deleteImage(String id);

    ImageResDTO uploadImageFile(String id, MultipartFile file);

    void deleteImageFile(String id);
}
