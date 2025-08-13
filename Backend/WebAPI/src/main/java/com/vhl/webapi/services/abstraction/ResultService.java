package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.ResultReqDTO;
import com.vhl.webapi.dtos.requests.UpdateResultReqDTO;
import com.vhl.webapi.dtos.responses.ResultResDTO;

import java.util.List;


public interface ResultService {
    ResultResDTO createResult(ResultReqDTO resultReqDTO);

    List<ResultResDTO> getResultsByLearnerId(String learnerId);

    ResultResDTO getResultById(String id);

    ResultResDTO updateResult(String id, UpdateResultReqDTO updateResultReqDTO);
}

