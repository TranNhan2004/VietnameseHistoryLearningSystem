package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.AnswerOptionErrorCode;
import com.vhl.webapi.constants.errorcodes.ResultErrorCode;
import com.vhl.webapi.dtos.requests.ResultAnswerReqDTO;
import com.vhl.webapi.dtos.responses.ResultAnswerResDTO;
import com.vhl.webapi.entities.specific.AnswerOption;
import com.vhl.webapi.entities.specific.Result;
import com.vhl.webapi.entities.specific.ResultAnswer;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.mappers.ResultAnswerMapper;
import com.vhl.webapi.repositories.AnswerOptionRepository;
import com.vhl.webapi.repositories.ResultAnswerRepository;
import com.vhl.webapi.repositories.ResultRepository;
import com.vhl.webapi.services.abstraction.ResultAnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResultAnswerServiceImpl implements ResultAnswerService {
    private final ResultAnswerRepository resultAnswerRepository;
    private final ResultAnswerMapper resultAnswerMapper;
    private final ResultRepository resultRepository;
    private final AnswerOptionRepository answerOptionRepository;
    
    @Override
    @Transactional
    public List<ResultAnswerResDTO> createBatch(List<ResultAnswerReqDTO> dtos) {
        Result result = resultRepository.findById(dtos.get(0).getResultId())
            .orElseThrow(() -> new NoInstanceFoundException(ResultErrorCode.RESULT__NOT_FOUND));

        List<String> answerOptionIds = dtos.stream()
            .map(ResultAnswerReqDTO::getAnswerOptionId)
            .toList();

        List<AnswerOption> answerOptions = answerOptionRepository.findAllById(answerOptionIds);
        if (answerOptions.size() != answerOptionIds.size()) {
            throw new NoInstanceFoundException(AnswerOptionErrorCode.ANSWER_OPTION__NOT_FOUND);
        }

        List<ResultAnswer> resultAnswers = answerOptions.stream()
            .map(option -> {
                ResultAnswer resultAnswer = new ResultAnswer();
                resultAnswer.setResult(result);
                resultAnswer.setAnswerOption(option);
                return resultAnswer;
            })
            .toList();

        return resultAnswerRepository.saveAll(resultAnswers).stream()
            .map(resultAnswerMapper::toResultAnswerResDTO)
            .toList();
    }

}
