package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.StudyProgressReqDTO;
import com.vhl.webapi.dtos.responses.StudyProgressResDTO;

import java.util.List;

public interface StudyProgressService {
    List<StudyProgressResDTO> getStudyProgresssByLearner(String learnerId);

    StudyProgressResDTO createStudyProgress(StudyProgressReqDTO studyProgressReqDTO);

    void updateStudyProgress(String id, StudyProgressReqDTO studyProgressReqDTO);

    void deleteStudyProgress(String id);
}
