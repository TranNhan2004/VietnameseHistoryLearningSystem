package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.GeneralErrorCode;
import com.vhl.webapi.dtos.requests.ParagraphReqDTO;
import com.vhl.webapi.dtos.responses.ParagraphResDTO;
import com.vhl.webapi.entities.specific.Paragraph;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.mappers.ParagraphMapper;
import com.vhl.webapi.repositories.ParagraphRepository;
import com.vhl.webapi.services.abstraction.ParagraphService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ParagraphServiceImpl implements ParagraphService {
    private final ParagraphRepository paragraphRepository;
    private final ParagraphMapper paragraphMapper;

    @Override
    public ParagraphResDTO createParagraph(ParagraphReqDTO paragraphReqDTO) {
        Paragraph paragraph = paragraphMapper.toParagraph(paragraphReqDTO);
        Paragraph savedParagraph = paragraphRepository.save(paragraph);
        return paragraphMapper.toParagraphResDTO(savedParagraph);
    }

    @Override
    public void updateParagraph(String id, ParagraphReqDTO paragraphReqDTO) {
        Paragraph existing = paragraphRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(GeneralErrorCode.NOT_FOUND));

        paragraphMapper.updateParagraphFromDTO(paragraphReqDTO, existing);
        paragraphRepository.save(existing);
    }

    @Override
    public void deleteParagraph(String id) {
        if (!paragraphRepository.existsById(id)) {
            throw new NoInstanceFoundException(GeneralErrorCode.NOT_FOUND);
        }
        paragraphRepository.deleteById(id);
    }
}
