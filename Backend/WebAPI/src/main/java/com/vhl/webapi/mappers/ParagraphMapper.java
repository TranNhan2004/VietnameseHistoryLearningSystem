package com.vhl.webapi.mappers;

import com.vhl.webapi.dtos.requests.ParagraphReqDTO;
import com.vhl.webapi.dtos.responses.ParagraphResDTO;
import com.vhl.webapi.entities.specific.Paragraph;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ParagraphMapper {
    @Mapping(target = "lessonId", source = "lesson.id")
    ParagraphResDTO toParagraphResDTO(Paragraph paragraph);

    @Mapping(target = "lesson", ignore = true)
    Paragraph toParagraph(ParagraphReqDTO paragraphReqDTO);

    void updateParagraphFromDTO(ParagraphReqDTO paragraphReqDTO, @MappingTarget Paragraph paragraph);
}
