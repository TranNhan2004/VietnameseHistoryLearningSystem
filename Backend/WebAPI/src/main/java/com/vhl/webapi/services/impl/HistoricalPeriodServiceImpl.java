package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.GeneralErrorCode;
import com.vhl.webapi.dtos.requests.HistoricalPeriodReqDTO;
import com.vhl.webapi.dtos.responses.HistoricalPeriodResDTO;
import com.vhl.webapi.entities.specific.HistoricalPeriod;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.mappers.HistoricalPeriodMapper;
import com.vhl.webapi.repositories.HistoricalPeriodRepository;
import com.vhl.webapi.services.abstraction.HistoricalPeriodService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HistoricalPeriodServiceImpl implements HistoricalPeriodService {
    private final HistoricalPeriodRepository historicalPeriodRepository;
    private final HistoricalPeriodMapper historicalPeriodMapper;

    @Override
    public List<HistoricalPeriodResDTO> getHistoricalPeriods() {
        List<HistoricalPeriod> historicalPeriods = historicalPeriodRepository.findAll();
        return historicalPeriods.stream()
            .map(historicalPeriodMapper::toHistoricalPeriodResDTO)
            .toList();
    }

    @Override
    public HistoricalPeriodResDTO getHistoricalPeriodById(String id) {
        System.out.println(id);
        HistoricalPeriod historicalPeriod = historicalPeriodRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(GeneralErrorCode.NOT_FOUND));
        return historicalPeriodMapper.toHistoricalPeriodResDTO(historicalPeriod);
    }

    @Override
    public HistoricalPeriodResDTO createHistoricalPeriod(HistoricalPeriodReqDTO historicalPeriodReqDTO) {
        HistoricalPeriod historicalPeriod = historicalPeriodMapper.toHistoricalPeriod(historicalPeriodReqDTO);
        historicalPeriodRepository.save(historicalPeriod);
        return historicalPeriodMapper.toHistoricalPeriodResDTO(historicalPeriod);
    }

    @Override
    public void updateHistoricalPeriod(String id, HistoricalPeriodReqDTO historicalPeriodReqDTO) {
        HistoricalPeriod existing = historicalPeriodRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(GeneralErrorCode.NOT_FOUND));

        historicalPeriodMapper.updateHistoricalPeriodFromDTO(historicalPeriodReqDTO, existing);
        historicalPeriodRepository.save(existing);
    }

    @Override
    public void deleteHistoricalPeriod(String id) {
        if (!historicalPeriodRepository.existsById(id)) {
            throw new NoInstanceFoundException(GeneralErrorCode.NOT_FOUND);
        }

        historicalPeriodRepository.deleteById(id);
    }
}
