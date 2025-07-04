package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.GeneralErrorCode;
import com.vhl.webapi.constants.errorcodes.ImageErrorCode;
import com.vhl.webapi.constants.storage.CloudinaryStorageFolder;
import com.vhl.webapi.dtos.requests.ImageReqDTO;
import com.vhl.webapi.dtos.responses.ImageResDTO;
import com.vhl.webapi.entities.specific.Image;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.mappers.ImageMapper;
import com.vhl.webapi.repositories.ImageRepository;
import com.vhl.webapi.services.abstraction.FileService;
import com.vhl.webapi.services.abstraction.ImageService;
import com.vhl.webapi.utils.cloudinary.CloudinaryUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {
    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;
    private final FileService fileService;

    @Override
    public ImageResDTO uploadImage(ImageReqDTO imageReqDTO, MultipartFile file) {
        try {
            String url = fileService.uploadFile(file, CloudinaryStorageFolder.LESSON_IMAGE, "image");
            imageReqDTO.setImageUrl(url);

            Image image = imageMapper.toImage(imageReqDTO);
            imageRepository.save(image);
            return imageMapper.toImageResDTO(image);

        } catch (Exception e) {
            throw new RuntimeException(ImageErrorCode.UPLOAD_IMAGE__FAILED);
        }
    }


    @Override
    public void deleteImage(String id) {
        try {
            Image image = imageRepository.findById(id)
                .orElseThrow(() -> new NoInstanceFoundException(GeneralErrorCode.NOT_FOUND));

            fileService.deleteFile(CloudinaryUtils.extractPublicIdFromUrl(image.getImageUrl()));
            imageRepository.delete(image);

        } catch (Exception e) {
            throw new RuntimeException(ImageErrorCode.DELETE_IMAGE__FAILED);
        }

    }
}
