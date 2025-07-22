package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.AnswerOptionErrorCode;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.repositories.AnswerOptionRepository;
import com.vhl.webapi.services.abstraction.AnswerOptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnswerOptionServiceImpl implements AnswerOptionService {
    private final AnswerOptionRepository answerOptionRepository;

    @Override
    public void deleteAnswerOption(String id) {
        if (!answerOptionRepository.existsById(id)) {
            throw new NoInstanceFoundException(AnswerOptionErrorCode.ANSWER_OPTION__NOT_FOUND);
        }

        answerOptionRepository.deleteById(id);
    }
}
