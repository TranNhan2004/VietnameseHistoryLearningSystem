package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.ResultAnswerReqDTO;
import com.vhl.webapi.dtos.responses.ResultAnswerResDTO;

import java.util.List;

public interface ResultAnswerService {
    List<ResultAnswerResDTO> createBatch(List<ResultAnswerReqDTO> resultAnswerReqDTOS);
}
