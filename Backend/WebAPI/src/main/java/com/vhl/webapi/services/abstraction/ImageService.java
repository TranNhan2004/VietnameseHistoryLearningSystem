package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.ImageReqDTO;
import com.vhl.webapi.dtos.responses.ImageResDTO;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    ImageResDTO uploadImage(ImageReqDTO imageReqDTO, MultipartFile file);

    void deleteImage(String id);
}
