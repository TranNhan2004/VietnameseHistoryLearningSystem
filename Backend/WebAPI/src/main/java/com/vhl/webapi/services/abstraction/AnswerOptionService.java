package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.IdsReqDTO;
import com.vhl.webapi.dtos.responses.AnswerOptionResDTO;

import java.util.List;

public interface AnswerOptionService {
    List<AnswerOptionResDTO> getAnswerOptionsByIds(IdsReqDTO idsReqDTO);

    void deleteAnswerOption(String id);
}
