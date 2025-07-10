package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.LessonReqDTO;
import com.vhl.webapi.dtos.responses.LessonResDTO;
import com.vhl.webapi.dtos.responses.LessonVideoResDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface LessonService {
    List<LessonResDTO> getAllLessonsByHistoricalPeriodId(String historicalPeriodId);

    LessonResDTO getLessonById(String id);

    LessonResDTO createLesson(LessonReqDTO lessonReqDTO);

    void updateLesson(String id, LessonReqDTO lessonReqDTO);

    void deleteLesson(String id);

    LessonVideoResDTO uploadVideo(String id, MultipartFile file);

    void deleteVideo(String id);
}
