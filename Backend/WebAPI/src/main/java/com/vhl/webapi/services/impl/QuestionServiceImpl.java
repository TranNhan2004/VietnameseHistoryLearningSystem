package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.AnswerOptionErrorCode;
import com.vhl.webapi.constants.errorcodes.LessonErrorCode;
import com.vhl.webapi.constants.errorcodes.QuestionErrorCode;
import com.vhl.webapi.dtos.requests.IdsReqDTO;
import com.vhl.webapi.dtos.requests.QuestionReqDTO;
import com.vhl.webapi.dtos.requests.UpdateQuestionReqDTO;
import com.vhl.webapi.dtos.requests.UpdateQuestionsForLessonReqDTO;
import com.vhl.webapi.dtos.responses.QuestionResDTO;
import com.vhl.webapi.entities.specific.AnswerOption;
import com.vhl.webapi.entities.specific.Lesson;
import com.vhl.webapi.entities.specific.Question;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.mappers.AnswerOptionMapper;
import com.vhl.webapi.mappers.QuestionMapper;
import com.vhl.webapi.repositories.AnswerOptionRepository;
import com.vhl.webapi.repositories.LessonRepository;
import com.vhl.webapi.repositories.QuestionRepository;
import com.vhl.webapi.services.abstraction.QuestionService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepository;
    private final AnswerOptionRepository answerOptionRepository;
    private final LessonRepository lessonRepository;
    private final QuestionMapper questionMapper;
    private final AnswerOptionMapper answerOptionMapper;

    @Override
    @Transactional
    public QuestionResDTO createQuestion(QuestionReqDTO questionReqDTO) {
        Lesson lesson = null;
        if (questionReqDTO.getLessonId() != null && !questionReqDTO.getLessonId().isBlank()) {
            lesson = lessonRepository.findById(questionReqDTO.getLessonId())
                .orElseThrow(() -> new NoInstanceFoundException(LessonErrorCode.LESSON__NOT_FOUND));
        }

        Question question = questionMapper.toQuestion(questionReqDTO);
        question.setLesson(lesson);

        Question saved = questionRepository.saveAndFlush(question);

        List<AnswerOption> answerOptions = questionReqDTO.getAnswerOptions().stream()
            .map(dto -> {
                AnswerOption answerOption = answerOptionMapper.toAnswerOption(dto);
//                answerOption.setCorrect(dto.getCorrect() != null ? dto.getCorrect() : true);
                answerOption.setQuestion(saved);
                return answerOption;
            })
            .toList();

        answerOptionRepository.saveAll(answerOptions);
        saved.getAnswerOptions().addAll(answerOptions);
        return questionMapper.toQuestionResDTO(saved);
    }


    @Override
    public List<QuestionResDTO> getAllQuestions() {
        List<Question> questions = questionRepository.findAll();
        return questions.stream()
            .map(questionMapper::toQuestionResDTO)
            .toList();
    }

    @Override
    public List<QuestionResDTO> getQuestionsByIds(IdsReqDTO idsReqDTO) {
        List<Question> questions = questionRepository.findByIdIn(idsReqDTO.getIds());
        return questions.stream()
            .map(questionMapper::toQuestionResDTO)
            .toList();
    }

    @Override
    @Transactional
    public void updateQuestionForLesson(UpdateQuestionsForLessonReqDTO updateQuestionsForLessonReqDTO) {
        Lesson lesson = lessonRepository.findById(updateQuestionsForLessonReqDTO.getLessonId())
            .orElseThrow(() -> new NoInstanceFoundException(LessonErrorCode.LESSON__NOT_FOUND));

        List<Question> questions = questionRepository.findByIdIn(updateQuestionsForLessonReqDTO.getQuestionIds());
        if (questions.size() != updateQuestionsForLessonReqDTO.getQuestionIds().size()) {
            throw new NoInstanceFoundException(QuestionErrorCode.QUESTION__NOT_FOUND);
        }

        List<Question> newQuestions = questions.stream()
            .map(q -> {
                q.setLesson(lesson);
                return q;
            })
            .toList();

        questionRepository.saveAll(newQuestions);
    }


    @Override
    public QuestionResDTO getQuestionById(String id) {
        Question question = questionRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(QuestionErrorCode.QUESTION__NOT_FOUND));
        return questionMapper.toQuestionResDTO(question);
    }


    @Override
    @Transactional
    public void updateQuestion(String id, UpdateQuestionReqDTO updateQuestionReqDTO) {
        Question question = questionRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(QuestionErrorCode.QUESTION__NOT_FOUND));

        question.setContent(updateQuestionReqDTO.getContent());
        if (updateQuestionReqDTO.getLessonId() != null) {
            Lesson lesson = lessonRepository.findById(updateQuestionReqDTO.getLessonId())
                .orElseThrow(() -> new NoInstanceFoundException(LessonErrorCode.LESSON__NOT_FOUND));
            question.setLesson(lesson);
        } else {
            question.setLesson(null);
        }

        List<AnswerOption> updatedAnswerOptions = updateQuestionReqDTO.getAnswerOptions().stream()
            .map(dto -> {
                AnswerOption answerOption = new AnswerOption();

                if (dto.getId() != null && !dto.getId().isBlank()) {
                    answerOption = answerOptionRepository.findById(dto.getId())
                        .orElseThrow(() -> new NoInstanceFoundException(AnswerOptionErrorCode.ANSWER_OPTION__NOT_FOUND));
                    answerOptionMapper.updateAnswerOptionFromDTO(dto, answerOption);
                } else {
                    answerOption.setContent(dto.getContent());
                    answerOption.setCorrect(dto.getCorrect());
                    answerOption.setQuestion(question);
                }

                return answerOption;
            })
            .toList();

        answerOptionRepository.saveAll(updatedAnswerOptions);
        questionRepository.save(question);
    }


    @Override
    @Transactional
    public void deleteQuestion(String id) {
        Question question = questionRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(QuestionErrorCode.QUESTION__NOT_FOUND));

        answerOptionRepository.deleteByQuestion_Id(id);
        questionRepository.delete(question);
    }

}
