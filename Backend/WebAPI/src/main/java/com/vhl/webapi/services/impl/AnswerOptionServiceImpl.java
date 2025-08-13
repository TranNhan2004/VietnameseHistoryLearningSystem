package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.AnswerOptionErrorCode;
import com.vhl.webapi.dtos.requests.IdsReqDTO;
import com.vhl.webapi.dtos.responses.AnswerOptionResDTO;
import com.vhl.webapi.entities.specific.AnswerOption;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.mappers.AnswerOptionMapper;
import com.vhl.webapi.repositories.AnswerOptionRepository;
import com.vhl.webapi.services.abstraction.AnswerOptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnswerOptionServiceImpl implements AnswerOptionService {
    private final AnswerOptionRepository answerOptionRepository;
    private final AnswerOptionMapper answerOptionMapper;

    @Override
    public List<AnswerOptionResDTO> getAnswerOptionsByIds(IdsReqDTO idsReqDTO) {
        List<AnswerOption> answerOptions = answerOptionRepository.findByIdIn(idsReqDTO.getIds());
        return answerOptions.stream()
            .map(answerOptionMapper::toAnswerOptionResDTO)
            .toList();
    }

    @Override
    public void deleteAnswerOption(String id) {
        if (!answerOptionRepository.existsById(id)) {
            throw new NoInstanceFoundException(AnswerOptionErrorCode.ANSWER_OPTION__NOT_FOUND);
        }

        answerOptionRepository.deleteById(id);
    }
}
