package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.ContestErrorCode;
import com.vhl.webapi.constants.errorcodes.LearnerErrorCode;
import com.vhl.webapi.constants.errorcodes.ResultErrorCode;
import com.vhl.webapi.dtos.requests.ResultReqDTO;
import com.vhl.webapi.dtos.requests.UpdateResultReqDTO;
import com.vhl.webapi.dtos.responses.ResultResDTO;
import com.vhl.webapi.entities.specific.*;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.mappers.ResultMapper;
import com.vhl.webapi.repositories.*;
import com.vhl.webapi.services.abstraction.LearnerService;
import com.vhl.webapi.services.abstraction.ResultService;
import com.vhl.webapi.utils.rules.PointAllocationRuleUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResultServiceImpl implements ResultService {
    private final ResultRepository resultRepository;
    private final ResultMapper resultMapper;
    private final LearnerRepository learnerRepository;
    private final ContestRepository contestRepository;
    private final ContestQuestionRepository contestQuestionRepository;
    private final ResultAnswerRepository resultAnswerRepository;
    private final LearnerService learnerService;

    @Override
    public ResultResDTO createResult(ResultReqDTO resultReqDTO) {
        Learner learner = learnerRepository.findById(resultReqDTO.getLearnerId())
            .orElseThrow(() -> new NoInstanceFoundException(LearnerErrorCode.LEARNER__NOT_FOUND));

        Contest contest = contestRepository.findById(resultReqDTO.getContestId())
            .orElseThrow(() -> new NoInstanceFoundException(ContestErrorCode.CONTEST__NOT_FOUND));

        Result result = new Result();
        result.setStartTime(resultReqDTO.getStartTime());
        result.setLearner(learner);
        result.setContest(contest);

        resultRepository.save(result);
        return resultMapper.toResultResDTO(result);
    }

    @Override
    public List<ResultResDTO> getResultsByLearnerId(String learnerId) {
        List<Result> results = resultRepository.findAllByLearner_Id(learnerId);
        return results.stream()
            .map(resultMapper::toResultResDTO)
            .toList();
    }

    @Override
    public List<ResultResDTO> getResultsByContestId(String contestId) {
        List<Result> results = resultRepository.findAllByContest_Id(contestId);
        return results.stream()
            .map(resultMapper::toResultResDTO)
            .toList();
    }

    @Override
    public ResultResDTO getResultByLearnerAndContestId(String learnerId, String contestId) {
        Result result = resultRepository.findByLearner_IdAndContest_Id(learnerId, contestId)
            .orElseThrow(() -> new NoInstanceFoundException(ResultErrorCode.RESULT__NOT_FOUND));
        return resultMapper.toResultResDTO(result);
    }

    @Override
    public ResultResDTO getResultById(String id) {
        Result result = resultRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(ResultErrorCode.RESULT__NOT_FOUND));
        return resultMapper.toResultResDTO(result);
    }

    @Override
    @Transactional
    public ResultResDTO updateResult(String id, UpdateResultReqDTO updateResultReqDTO) {
        Result result = resultRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(ResultErrorCode.RESULT__NOT_FOUND));

        if (updateResultReqDTO.getEndTime().isBefore(result.getStartTime())) {
            throw new RuntimeException(ResultErrorCode.END_TIME__INVALID);
        }

        result.setEndTime(updateResultReqDTO.getEndTime());

        List<ResultAnswer> resultAnswers = resultAnswerRepository.findAllByResult_Id(id);


        if (resultAnswers == null || resultAnswers.isEmpty()) {
            result.setScore(0.0);
            resultRepository.save(result);

            learnerService.updatePointAndRank(result.getLearner().getId(), 0);
            learnerService.updateScore(result.getLearner().getId(), 0.0);
            return resultMapper.toResultResDTO(result);
        }


        Map<String, List<ResultAnswer>> answersByQuestion = resultAnswers.stream()
            .collect(Collectors.groupingBy(ra -> ra.getAnswerOption().getQuestion().getId()));

        double totalScore = 0.0;
        double fullScore = 0.0;
        for (Map.Entry<String, List<ResultAnswer>> entry : answersByQuestion.entrySet()) {
            String questionId = entry.getKey();
            List<ResultAnswer> chosenAnswers = entry.getValue();

            var contestQuestion = contestQuestionRepository
                .findByContest_IdAndQuestion_Id(result.getContest().getId(), questionId);

            fullScore += contestQuestion.getPoint();
            if (contestQuestion == null) continue;

            double originalPoint = contestQuestion.getPoint();
            String pointRule = contestQuestion.getPointAllocationRule();

            List<AnswerOption> correctAnswers = contestQuestion.getQuestion()
                .getAnswerOptions()
                .stream()
                .filter(opt -> opt.getCorrect())
                .toList();

            int totalCorrect = correctAnswers.size();
            long correctChosen = chosenAnswers.stream()
                .filter(ra -> ra.getAnswerOption().getCorrect())
                .count();

            int chosenCount = chosenAnswers.size();

            double questionScore = 0.0;

            if (chosenCount > totalCorrect) {
                questionScore = 0.0;
            } else {
                questionScore = PointAllocationRuleUtils
                    .getPoint(originalPoint, (int) correctChosen, pointRule);
            }

            totalScore += questionScore;
        }

        result.setScore(totalScore);
        resultRepository.save(result);

        double scoreIn100 = (totalScore / fullScore) * 100;
        learnerService.updatePointAndRank(result.getLearner().getId(), (int) scoreIn100);
        learnerService.updateScore(result.getLearner().getId(), scoreIn100);
        return resultMapper.toResultResDTO(result);
    }


}
