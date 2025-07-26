package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.LearnerErrorCode;
import com.vhl.webapi.constants.errorcodes.LessonErrorCode;
import com.vhl.webapi.constants.errorcodes.StudyProgressErrorCode;
import com.vhl.webapi.dtos.requests.StudyProgressReqDTO;
import com.vhl.webapi.dtos.responses.StudyProgressResDTO;
import com.vhl.webapi.entities.specific.Learner;
import com.vhl.webapi.entities.specific.Lesson;
import com.vhl.webapi.entities.specific.StudyProgress;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.mappers.StudyProgressMapper;
import com.vhl.webapi.repositories.LearnerRepository;
import com.vhl.webapi.repositories.LessonRepository;
import com.vhl.webapi.repositories.StudyProgressRepository;
import com.vhl.webapi.services.abstraction.StudyProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudyProgressServiceImpl implements StudyProgressService {
    private final StudyProgressRepository studyProgressRepository;
    private final StudyProgressMapper studyProgressMapper;
    private final LessonRepository lessonRepository;
    private final LearnerRepository learnerRepository;


    @Override
    @Transactional
    public List<StudyProgressResDTO> getStudyProgresssByLearner(String learnerId) {
        List<StudyProgress> studyProgresss = studyProgressRepository.findAllByLearner_Id(learnerId);
        return studyProgresss.stream()
            .map(studyProgressMapper::toStudyProgressResDTO)
            .toList();
    }

    @Override
    public StudyProgressResDTO createStudyProgress(StudyProgressReqDTO studyProgressReqDTO) {
        Lesson lesson = lessonRepository.findById(studyProgressReqDTO.getLessonId())
            .orElseThrow(() -> new NoInstanceFoundException(LessonErrorCode.LESSON__NOT_FOUND));

        Learner learner = learnerRepository.findById(studyProgressReqDTO.getLearnerId())
            .orElseThrow(() -> new NoInstanceFoundException(LearnerErrorCode.LEARNER__NOT_FOUND));

        StudyProgress studyProgress = new StudyProgress();
        studyProgress.setLesson(lesson);
        studyProgress.setLearner(learner);
        StudyProgress saved = studyProgressRepository.save(studyProgress);
        return studyProgressMapper.toStudyProgressResDTO(saved);
    }

    @Override
    public void updateStudyProgress(String id, StudyProgressReqDTO studyProgressReqDTO) {
        StudyProgress existing = studyProgressRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(StudyProgressErrorCode.STUDY_PROGRESS__NOT_FOUND));

        existing.setProgress(studyProgressReqDTO.getProgress());
        studyProgressRepository.save(existing);
    }

    @Override
    public void deleteStudyProgress(String id) {
        if (!studyProgressRepository.existsById(id)) {
            throw new NoInstanceFoundException(StudyProgressErrorCode.STUDY_PROGRESS__NOT_FOUND);
        }

        studyProgressRepository.deleteById(id);
    }
}
