package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.AdminErrorCode;
import com.vhl.webapi.constants.errorcodes.HistoricalPeriodErrorCode;
import com.vhl.webapi.constants.errorcodes.LessonErrorCode;
import com.vhl.webapi.constants.storage.CloudinaryStorageFolder;
import com.vhl.webapi.dtos.requests.LessonReqDTO;
import com.vhl.webapi.dtos.responses.LessonResDTO;
import com.vhl.webapi.dtos.responses.LessonVideoResDTO;
import com.vhl.webapi.entities.specific.Admin;
import com.vhl.webapi.entities.specific.HistoricalPeriod;
import com.vhl.webapi.entities.specific.Lesson;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.mappers.LessonMapper;
import com.vhl.webapi.repositories.AdminRepository;
import com.vhl.webapi.repositories.HistoricalPeriodRepository;
import com.vhl.webapi.repositories.LessonRepository;
import com.vhl.webapi.services.abstraction.FileService;
import com.vhl.webapi.services.abstraction.LessonService;
import com.vhl.webapi.utils.cloudinary.CloudinaryUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonServiceImpl implements LessonService {
    private final LessonRepository lessonRepository;
    private final HistoricalPeriodRepository historicalPeriodRepository;
    private final AdminRepository adminRepository;
    private final LessonMapper lessonMapper;
    private final FileService fileService;

    @Override
    public List<LessonResDTO> getAllLessonsByHistoricalPeriodId(String historicalPeriodId) {
        List<Lesson> lessons = lessonRepository.findAllByHistoricalPeriod_Id(historicalPeriodId);
        return lessons.stream()
            .map(lessonMapper::toLessonResDTO)
            .toList();
    }

    @Override
    public LessonResDTO getLessonById(String id) {
        Lesson lesson = lessonRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(LessonErrorCode.LESSON__NOT_FOUND));

        return lessonMapper.toLessonResDTO(lesson);
    }

    @Override
    public LessonResDTO createLesson(LessonReqDTO lessonReqDTO) {
        HistoricalPeriod historicalPeriod = historicalPeriodRepository.findById(lessonReqDTO.getHistoricalPeriodId())
            .orElseThrow(() -> new NoInstanceFoundException(HistoricalPeriodErrorCode.HISTORICAL_PERIOD__NOT_FOUND));

        Admin admin = adminRepository.findById(lessonReqDTO.getAdminId())
            .orElseThrow(() -> new NoInstanceFoundException(AdminErrorCode.ADMIN__NOT_FOUND));

        Lesson lesson = lessonMapper.toLesson(lessonReqDTO);
        lesson.setHistoricalPeriod(historicalPeriod);
        lesson.setAdmin(admin);
        Lesson saved = lessonRepository.save(lesson);
        return lessonMapper.toLessonResDTO(saved);
    }

    @Override
    public void updateLesson(String id, LessonReqDTO lessonReqDTO) {
        Lesson existing = lessonRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(LessonErrorCode.LESSON__NOT_FOUND));
        lessonMapper.updateLessonFromDTO(lessonReqDTO, existing);
        lessonRepository.save(existing);
    }

    @Override
    public void deleteLesson(String id) {
        deleteVideo(id);
        lessonRepository.deleteById(id);
    }

    @Override
    public LessonVideoResDTO uploadVideo(String id, MultipartFile file) {
        try {
            Lesson lesson = lessonRepository.findById(id).orElseThrow(
                () -> new NoInstanceFoundException(LessonErrorCode.LESSON__NOT_FOUND)
            );

            if (lesson.getVideoUrl() != null && !lesson.getVideoUrl().isBlank()) {
                fileService.deleteFile(CloudinaryUtils.extractPublicIdFromUrl(lesson.getVideoUrl()));
            }

            String url = fileService.uploadFile(file, CloudinaryStorageFolder.LESSON_VIDEO, "video");

            lesson.setVideoUrl(url);
            lessonRepository.save(lesson);

            LessonVideoResDTO lessonVideoResDTO = new LessonVideoResDTO();
            lessonVideoResDTO.setVideoUrl(url);
            return lessonVideoResDTO;

        } catch (Exception e) {
            throw new RuntimeException(LessonErrorCode.VIDEO__UPLOAD_FAILED);
        }
    }

    @Override
    public void deleteVideo(String id) {
        try {
            Lesson lesson = lessonRepository.findById(id).orElseThrow(
                () -> new NoInstanceFoundException(LessonErrorCode.LESSON__NOT_FOUND)
            );

            if (!lesson.getVideoUrl().isBlank()) {
                fileService.deleteFile(CloudinaryUtils.extractPublicIdFromUrl(lesson.getVideoUrl()));
                lesson.setVideoUrl(null);
                lessonRepository.save(lesson);
            }
        } catch (Exception e) {
            throw new RuntimeException(LessonErrorCode.VIDEO__DELETE_FAILED);
        }
    }
}
