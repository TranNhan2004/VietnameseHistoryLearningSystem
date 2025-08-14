package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.ContestReqDTO;
import com.vhl.webapi.dtos.requests.IdsReqDTO;
import com.vhl.webapi.dtos.responses.ContestResDTO;

import java.util.List;

public interface ContestService {
    List<ContestResDTO> getAllContests();

    List<ContestResDTO> getAllByIds(IdsReqDTO idsReqDTO);

    ContestResDTO getContestById(String id);

    ContestResDTO createContest(ContestReqDTO contestReqDTO);

    void updateContest(String id, ContestReqDTO contestReqDTO);

    void deleteContest(String id);
}
