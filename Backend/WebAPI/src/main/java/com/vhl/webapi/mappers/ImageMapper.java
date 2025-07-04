package com.vhl.webapi.mappers;

import com.vhl.webapi.dtos.requests.ImageReqDTO;
import com.vhl.webapi.dtos.responses.ImageResDTO;
import com.vhl.webapi.entities.specific.Image;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ImageMapper {
    ImageResDTO toImageResDTO(Image image);

    Image toImage(ImageReqDTO imageReqDTO);
}
