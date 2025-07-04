package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.ParagraphReqDTO;
import com.vhl.webapi.dtos.responses.ParagraphResDTO;

public interface ParagraphService {
    ParagraphResDTO createParagraph(ParagraphReqDTO paragraphReqDTO);

    void updateParagraph(String id, ParagraphReqDTO paragraphReqDTO);

    void deleteParagraph(String id);
}
