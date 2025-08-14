package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.ContestErrorCode;
import com.vhl.webapi.dtos.requests.ContestReqDTO;
import com.vhl.webapi.dtos.requests.IdsReqDTO;
import com.vhl.webapi.dtos.responses.ContestResDTO;
import com.vhl.webapi.entities.specific.Contest;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.mappers.ContestMapper;
import com.vhl.webapi.repositories.ContestRepository;
import com.vhl.webapi.services.abstraction.ContestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContestServiceImpl implements ContestService {
    private final ContestRepository contestRepository;
    private final ContestMapper contestMapper;

    @Override
    public List<ContestResDTO> getAllContests() {
        List<Contest> contests = contestRepository.findAll();
        return contests.stream()
            .map(contestMapper::toContestResDTO)
            .toList();
    }

    @Override
    public ContestResDTO getContestById(String id) {
        Contest contest = contestRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(ContestErrorCode.CONTEST__NOT_FOUND));

        return contestMapper.toContestResDTO(contest);
    }

    @Override
    public List<ContestResDTO> getAllByIds(IdsReqDTO idsReqDTO) {
        List<Contest> contests = contestRepository.findAllByIdIn(idsReqDTO.getIds());
        return contests.stream()
            .map(contestMapper::toContestResDTO)
            .toList();
    }

    @Override
    public ContestResDTO createContest(ContestReqDTO contestReqDTO) {
        Contest contest = contestMapper.toContest(contestReqDTO);
        contest.setName(contestReqDTO.getName());

        Contest saved = contestRepository.save(contest);
        return contestMapper.toContestResDTO(saved);
    }

    @Override
    public void updateContest(String id, ContestReqDTO contestReqDTO) {
        Contest existing = contestRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(ContestErrorCode.CONTEST__NOT_FOUND));

        contestMapper.updateContestFromDTO(contestReqDTO, existing);
        contestRepository.save(existing);
    }

    @Override
    public void deleteContest(String id) {
        if (!contestRepository.existsById(id)) {
            throw new NoInstanceFoundException(ContestErrorCode.CONTEST__NOT_FOUND);
        }

        contestRepository.deleteById(id);
    }
}
