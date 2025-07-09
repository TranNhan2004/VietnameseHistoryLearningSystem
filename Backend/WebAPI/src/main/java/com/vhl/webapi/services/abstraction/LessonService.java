package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.LessonReqDTO;
import com.vhl.webapi.dtos.responses.LessonResDTO;

import java.util.List;

public interface LessonService {
    List<LessonResDTO> getAllLessonsByHistoricalPeriodId(String historicalPeriodId);

    LessonResDTO getLessonById(String id);

    LessonResDTO createLesson(LessonReqDTO lessonReqDTO);

    void updateLesson(String id, LessonReqDTO lessonReqDTO);

    void deleteLesson(String id);
}
