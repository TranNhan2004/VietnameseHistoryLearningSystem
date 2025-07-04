package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.HistoricalPeriodReqDTO;
import com.vhl.webapi.dtos.responses.HistoricalPeriodResDTO;

import java.util.List;

public interface HistoricalPeriodService {
    List<HistoricalPeriodResDTO> getHistoricalPeriods();

    HistoricalPeriodResDTO getHistoricalPeriodById(String id);

    HistoricalPeriodResDTO createHistoricalPeriod(HistoricalPeriodReqDTO historicalPeriodReqDTO);

    void updateHistoricalPeriod(String id, HistoricalPeriodReqDTO historicalPeriodReqDTO);

    void deleteHistoricalPeriod(String id);
}
