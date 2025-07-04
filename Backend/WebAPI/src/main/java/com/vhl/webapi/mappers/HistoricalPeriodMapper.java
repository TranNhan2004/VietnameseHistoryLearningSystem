package com.vhl.webapi.mappers;

import com.vhl.webapi.dtos.requests.HistoricalPeriodReqDTO;
import com.vhl.webapi.dtos.responses.HistoricalPeriodResDTO;
import com.vhl.webapi.entities.specific.HistoricalPeriod;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface HistoricalPeriodMapper {
    HistoricalPeriod toHistoricalPeriod(HistoricalPeriodReqDTO historicalPeriodReqDTO);

    HistoricalPeriodResDTO toHistoricalPeriodResDTO(HistoricalPeriod historicalPeriod);

    void updateHistoricalPeriodFromDTO(
        HistoricalPeriodReqDTO historicalPeriodReqDTO,
        @MappingTarget HistoricalPeriod historicalPeriod
    );
}
