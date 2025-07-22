package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.ImageErrorCode;
import com.vhl.webapi.constants.errorcodes.LessonErrorCode;
import com.vhl.webapi.constants.storage.CloudinaryStorageFolder;
import com.vhl.webapi.dtos.requests.ImageReqDTO;
import com.vhl.webapi.dtos.responses.ImageResDTO;
import com.vhl.webapi.entities.specific.Image;
import com.vhl.webapi.entities.specific.Lesson;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.mappers.ImageMapper;
import com.vhl.webapi.repositories.ImageRepository;
import com.vhl.webapi.repositories.LessonRepository;
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
    private final LessonRepository lessonRepository;
    private final ImageMapper imageMapper;
    private final FileService fileService;

    @Override
    public ImageResDTO createImage(ImageReqDTO imageReqDTO) {
        Lesson lesson = lessonRepository.findById(imageReqDTO.getLessonId())
            .orElseThrow(() -> new NoInstanceFoundException(LessonErrorCode.LESSON__NOT_FOUND));

        Image image = imageMapper.toImage(imageReqDTO);
        image.setLesson(lesson);
        
        Image savedImage = imageRepository.save(image);
        return imageMapper.toImageResDTO(savedImage);
    }

    @Override
    public void updateImage(String id, ImageReqDTO imageReqDTO) {
        Image existing = imageRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(ImageErrorCode.IMAGE__NOT_FOUND));

        imageMapper.updateImageFromDTO(imageReqDTO, existing);
        imageRepository.save(existing);
    }

    @Override
    public void deleteImage(String id) {
        deleteImageFile(id);
        imageRepository.deleteById(id);
    }

    @Override
    public ImageResDTO uploadImageFile(String id, MultipartFile file) {
        try {
            Image image = imageRepository.findById(id)
                .orElseThrow(() -> new NoInstanceFoundException(ImageErrorCode.IMAGE__NOT_FOUND));

            if (image.getImageUrl() != null && !image.getImageUrl().isBlank()) {
                fileService.deleteFile(CloudinaryUtils.extractPublicIdFromUrl(image.getImageUrl()));
            }

            String url = fileService.uploadFile(file, CloudinaryStorageFolder.LESSON_IMAGE, "image");
            image.setImageUrl(url);
            Image savedImage = imageRepository.save(image);
            return imageMapper.toImageResDTO(savedImage);

        } catch (Exception e) {
            throw new RuntimeException(ImageErrorCode.IMAGE__UPLOAD_FAILED);
        }
    }

    @Override
    public void deleteImageFile(String id) {
        try {
            Image image = imageRepository.findById(id)
                .orElseThrow(() -> new NoInstanceFoundException(ImageErrorCode.IMAGE__NOT_FOUND));

            fileService.deleteFile(CloudinaryUtils.extractPublicIdFromUrl(image.getImageUrl()));

        } catch (Exception e) {
            throw new RuntimeException(ImageErrorCode.IMAGE__DELETE_FAILED);
        }
    }
}
