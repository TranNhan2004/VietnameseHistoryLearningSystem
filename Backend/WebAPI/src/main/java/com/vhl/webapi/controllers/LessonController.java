package com.vhl.webapi.controllers;

import com.vhl.webapi.dtos.requests.IdsReqDTO;
import com.vhl.webapi.dtos.requests.LessonReqDTO;
import com.vhl.webapi.dtos.responses.LessonResDTO;
import com.vhl.webapi.dtos.responses.LessonVideoResDTO;
import com.vhl.webapi.security.RoleChecker;
import com.vhl.webapi.services.abstraction.LessonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
public class LessonController {
    private final LessonService lessonService;
    private final RoleChecker roleChecker;

    @GetMapping("")
    public ResponseEntity<?> getAllLessons(@RequestParam String historicalPeriodId) {
        return ResponseEntity.ok(lessonService.getAllLessonsByHistoricalPeriodId(historicalPeriodId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getLessonById(@PathVariable String id) {
        return ResponseEntity.ok(lessonService.getLessonById(id));
    }

    @PreAuthorize("@roleChecker.hasRolePrefix('ADMIN')")
    @PostMapping("")
    public ResponseEntity<?> createLesson(@Valid @RequestBody LessonReqDTO lessonReqDTO) {
        LessonResDTO lessonResDTO = lessonService.createLesson(lessonReqDTO);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(lessonResDTO.getId())
            .toUri();

        return ResponseEntity.created(location).body(lessonResDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateLesson(@PathVariable String id, @Valid @RequestBody LessonReqDTO lessonReqDTO) {
        lessonService.updateLesson(id, lessonReqDTO);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("@roleChecker.hasRolePrefix('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLesson(@PathVariable String id) {
        lessonService.deleteLesson(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("@roleChecker.hasRolePrefix('ADMIN')")
    @PutMapping("/video/{id}")
    public ResponseEntity<?> uploadVideo(@PathVariable String id, @RequestParam("video") MultipartFile file) {
        LessonVideoResDTO lessonVideoResDTO = lessonService.uploadVideo(id, file);
        return ResponseEntity.ok(lessonVideoResDTO);
    }

    @PreAuthorize("@roleChecker.hasRolePrefix('ADMIN')")
    @DeleteMapping("/video/{id}")
    public ResponseEntity<?> deleteVideo(@PathVariable String id) {
        lessonService.deleteVideo(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/by-ids")
    public ResponseEntity<?> getLessonsByIds(@RequestBody IdsReqDTO idsReqDTO) {
        List<LessonResDTO> lessonResDTOS = lessonService.getLessonsByIds(idsReqDTO);
        return ResponseEntity.ok(lessonResDTOS);
    }

    @PutMapping("/views/{id}")
    public ResponseEntity<?> updateViews(@PathVariable String id) {
        lessonService.updateViews(id);
        return ResponseEntity.noContent().build();
    }
}
