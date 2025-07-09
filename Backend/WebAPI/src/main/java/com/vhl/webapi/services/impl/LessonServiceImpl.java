package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.GeneralErrorCode;
import com.vhl.webapi.dtos.requests.LessonReqDTO;
import com.vhl.webapi.dtos.responses.LessonResDTO;
import com.vhl.webapi.entities.specific.Lesson;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.mappers.LessonMapper;
import com.vhl.webapi.repositories.LessonRepository;
import com.vhl.webapi.services.abstraction.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonServiceImpl implements LessonService {
    private final LessonRepository lessonRepository;
    private final LessonMapper lessonMapper;

    @Override
    public List<LessonResDTO> getAllLessonsByHistoricalPeriodId(String historicalPeriodId) {
        List<Lesson> lessons = lessonRepository.findByHistoricalPeriodId(historicalPeriodId);
        return lessons.stream()
            .map(lessonMapper::toLessonResDTO)
            .toList();
    }

    @Override
    @Transactional
    public LessonResDTO getLessonById(String id) {
        Lesson lesson = lessonRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(GeneralErrorCode.NOT_FOUND));

        // Trigger loading
        lessonRepository.findByIdWithParagraphs(id);
        lessonRepository.findByIdWithImages(id);
        lessonRepository.findByIdWithQuestions(id);

        return lessonMapper.toLessonResDTO(lesson);
    }

    @Override
    public LessonResDTO createLesson(LessonReqDTO lessonReqDTO) {
        Lesson lesson = lessonMapper.toLesson(lessonReqDTO);
        Lesson saved = lessonRepository.save(lesson);
        return lessonMapper.toLessonResDTO(saved);
    }

    @Override
    public void updateLesson(String id, LessonReqDTO lessonReqDTO) {
        Lesson existing = lessonRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(GeneralErrorCode.NOT_FOUND));
        lessonMapper.updateLessonFromDTO(lessonReqDTO, existing);
        lessonRepository.save(existing);
    }

    @Override
    public void deleteLesson(String id) {
        if (!lessonRepository.existsById(id)) {
            throw new NoInstanceFoundException(GeneralErrorCode.NOT_FOUND);
        }
        lessonRepository.deleteById(id);
    }
}
