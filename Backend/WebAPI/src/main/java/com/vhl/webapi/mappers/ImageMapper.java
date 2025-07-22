package com.vhl.webapi.mappers;

import com.vhl.webapi.dtos.requests.ImageReqDTO;
import com.vhl.webapi.dtos.responses.ImageResDTO;
import com.vhl.webapi.entities.specific.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ImageMapper {
    @Mapping(target = "lessonId", source = "lesson.id")
    ImageResDTO toImageResDTO(Image image);

    @Mapping(target = "lesson", ignore = true)
    Image toImage(ImageReqDTO imageReqDTO);

    void updateImageFromDTO(ImageReqDTO imageReqDTO, @MappingTarget Image image);
}
