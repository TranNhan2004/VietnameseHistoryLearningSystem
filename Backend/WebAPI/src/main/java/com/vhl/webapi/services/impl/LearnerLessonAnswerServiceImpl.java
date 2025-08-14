package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.AnswerOptionErrorCode;
import com.vhl.webapi.constants.errorcodes.LearnerErrorCode;
import com.vhl.webapi.constants.errorcodes.LessonErrorCode;
import com.vhl.webapi.dtos.requests.LearnerLessonAnswerReqDTO;
import com.vhl.webapi.dtos.responses.LearnerLessonAnswerResDTO;
import com.vhl.webapi.entities.specific.AnswerOption;
import com.vhl.webapi.entities.specific.Learner;
import com.vhl.webapi.entities.specific.LearnerLessonAnswer;
import com.vhl.webapi.entities.specific.Lesson;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.mappers.LearnerLessonAnswerMapper;
import com.vhl.webapi.repositories.AnswerOptionRepository;
import com.vhl.webapi.repositories.LearnerLessonAnswerRepository;
import com.vhl.webapi.repositories.LearnerRepository;
import com.vhl.webapi.repositories.LessonRepository;
import com.vhl.webapi.services.abstraction.LearnerLessonAnswerService;
import com.vhl.webapi.services.abstraction.LearnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LearnerLessonAnswerServiceImpl implements LearnerLessonAnswerService {
    private final LearnerRepository learnerRepository;
    private final LessonRepository lessonRepository;
    private final AnswerOptionRepository answerOptionRepository;
    private final LearnerLessonAnswerRepository learnerLessonAnswerRepository;
    private final LearnerLessonAnswerMapper learnerLessonAnswerMapper;
    private final LearnerService learnerService;


    @Override
    @Transactional
    public List<LearnerLessonAnswerResDTO> createBatch(List<LearnerLessonAnswerReqDTO> dtos) {
        Learner learner = learnerRepository.findById(dtos.get(0).getLearnerId())
            .orElseThrow(() -> new NoInstanceFoundException(LearnerErrorCode.LEARNER__NOT_FOUND));

        Lesson lesson = lessonRepository.findById(dtos.get(0).getLessonId())
            .orElseThrow(() -> new NoInstanceFoundException(LessonErrorCode.LESSON__NOT_FOUND));

        List<String> answerOptionIds = dtos.stream()
            .map(LearnerLessonAnswerReqDTO::getAnswerOptionId)
            .toList();

        List<AnswerOption> answerOptions = answerOptionRepository.findAllById(answerOptionIds);

        if (answerOptions.size() != answerOptionIds.size()) {
            throw new NoInstanceFoundException(AnswerOptionErrorCode.ANSWER_OPTION__NOT_FOUND);
        }

        Map<String, AnswerOption> answerOptionMap = answerOptions.stream()
            .collect(Collectors.toMap(a -> a.getId().toString(), a -> a));

        List<LearnerLessonAnswer> learnerLessonAnswers = dtos.stream()
            .map(dto -> {
                AnswerOption answerOption = answerOptionMap.get(dto.getAnswerOptionId());

                LearnerLessonAnswer learnerLessonAnswer = new LearnerLessonAnswer();
                learnerLessonAnswer.setLearner(learner);
                learnerLessonAnswer.setLesson(lesson);
                learnerLessonAnswer.setAnswerOption(answerOption);
                return learnerLessonAnswer;
            })
            .toList();

        learnerService.updatePointAndRank(learner.getId(), 5);
        return learnerLessonAnswerRepository.saveAll(learnerLessonAnswers).stream()
            .map(learnerLessonAnswerMapper::toLearnerLessonAnswerResDTO)
            .toList();
    }

    @Override
    public List<LearnerLessonAnswerResDTO> getByLearnerAndLessonId(String learnerId, String lessonId) {
        List<LearnerLessonAnswer> learnerLessonAnswers = learnerLessonAnswerRepository
            .findAllByLearner_IdAndLesson_Id(learnerId, lessonId);

        return learnerLessonAnswers.stream()
            .map(learnerLessonAnswerMapper::toLearnerLessonAnswerResDTO)
            .toList();
    }

    @Override
    public List<LearnerLessonAnswerResDTO> getByLearnerId(String learnerId) {
        List<LearnerLessonAnswer> learnerLessonAnswers = learnerLessonAnswerRepository
            .findAllByLearner_Id(learnerId);

        return learnerLessonAnswers.stream()
            .map(learnerLessonAnswerMapper::toLearnerLessonAnswerResDTO)
            .toList();
    }
}
