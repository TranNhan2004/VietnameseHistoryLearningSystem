package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.ContestErrorCode;
import com.vhl.webapi.constants.errorcodes.ContestQuestionErrorCode;
import com.vhl.webapi.constants.errorcodes.QuestionErrorCode;
import com.vhl.webapi.dtos.requests.ContestQuestionReqDTO;
import com.vhl.webapi.dtos.responses.ContestQuestionResDTO;
import com.vhl.webapi.entities.specific.Contest;
import com.vhl.webapi.entities.specific.ContestQuestion;
import com.vhl.webapi.entities.specific.Question;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.mappers.ContestQuestionMapper;
import com.vhl.webapi.repositories.ContestQuestionRepository;
import com.vhl.webapi.repositories.ContestRepository;
import com.vhl.webapi.repositories.QuestionRepository;
import com.vhl.webapi.services.abstraction.ContestQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContestQuestionServiceImpl implements ContestQuestionService {
    private final ContestQuestionRepository contestQuestionRepository;
    private final ContestRepository contestRepository;
    private final QuestionRepository questionRepository;
    private final ContestQuestionMapper contestQuestionMapper;

    @Override
    public List<ContestQuestionResDTO> getAllContestQuestionsByContestId(String contestId) {
        List<ContestQuestion> contestQuestions = contestQuestionRepository.findAllByContest_Id(contestId);
        return contestQuestions.stream()
            .map(contestQuestionMapper::toContestQuestionResDTO)
            .toList();
    }

    @Override
    public ContestQuestionResDTO getContestQuestionById(String id) {
        ContestQuestion contestQuestion = contestQuestionRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(ContestQuestionErrorCode.CONTEST_QUESTION__NOT_FOUND));

        return contestQuestionMapper.toContestQuestionResDTO(contestQuestion);
    }

    @Override
    public ContestQuestionResDTO createContestQuestion(ContestQuestionReqDTO contestQuestionReqDTO) {
        Contest contest = contestRepository.findById(contestQuestionReqDTO.getContestId())
            .orElseThrow(() -> new NoInstanceFoundException(ContestErrorCode.CONTEST__NOT_FOUND));

        int count = contestQuestionRepository.findAllByContest_Id(contest.getId()).size();
        if (count == contest.getQuestionNumber()) {
            throw new RuntimeException(ContestErrorCode.QUESTION_NUMBER__EXCEEDED);
        }

        Question question = questionRepository.findById(contestQuestionReqDTO.getQuestionId())
            .orElseThrow(() -> new NoInstanceFoundException(QuestionErrorCode.QUESTION__NOT_FOUND));


        ContestQuestion contestQuestion = contestQuestionMapper.toContestQuestion(contestQuestionReqDTO);
        contestQuestion.setContest(contest);
        contestQuestion.setQuestion(question);
        ContestQuestion saved = contestQuestionRepository.save(contestQuestion);
        return contestQuestionMapper.toContestQuestionResDTO(saved);
    }

    @Override
    public void updateContestQuestion(String id, ContestQuestionReqDTO contestQuestionReqDTO) {
        ContestQuestion existing = contestQuestionRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(ContestQuestionErrorCode.CONTEST_QUESTION__NOT_FOUND));

        contestQuestionMapper.updateContestQuestionFromDTO(contestQuestionReqDTO, existing);

        if (contestQuestionReqDTO.getContestId() != null) {
            Contest contest = contestRepository.findById(contestQuestionReqDTO.getContestId())
                .orElseThrow(() -> new NoInstanceFoundException(ContestErrorCode.CONTEST__NOT_FOUND));
            existing.setContest(contest);
        }

        if (contestQuestionReqDTO.getQuestionId() != null) {
            Question question = questionRepository.findById(contestQuestionReqDTO.getQuestionId())
                .orElseThrow(() -> new NoInstanceFoundException(QuestionErrorCode.QUESTION__NOT_FOUND));
            existing.setQuestion(question);
        }

        contestQuestionRepository.save(existing);
    }

    @Override
    public void deleteContestQuestion(String id) {
        if (!contestQuestionRepository.existsById(id)) {
            throw new NoInstanceFoundException(ContestQuestionErrorCode.CONTEST_QUESTION__NOT_FOUND);
        }

        contestQuestionRepository.deleteById(id);
    }
}
