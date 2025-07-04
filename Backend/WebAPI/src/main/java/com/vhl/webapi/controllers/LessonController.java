package com.vhl.webapi.controllers;

import com.vhl.webapi.dtos.requests.LessonReqDTO;
import com.vhl.webapi.dtos.responses.LessonResDTO;
import com.vhl.webapi.services.abstraction.LessonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
public class LessonController {
    private final LessonService lessonService;

    @GetMapping("")
    public ResponseEntity<?> getAllLessons() {
        return ResponseEntity.ok(lessonService.getAllLessons());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getLessonById(@PathVariable String id) {
        return ResponseEntity.ok(lessonService.getLesson(id));
    }

    @PostMapping("")
    public ResponseEntity<?> createLesson(@Valid @RequestBody LessonReqDTO lessonReqDTO) {
        LessonResDTO data = lessonService.createLesson(lessonReqDTO);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(data.getId())
            .toUri();

        return ResponseEntity.created(location).body(data);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateLesson(@PathVariable String id, @Valid @RequestBody LessonReqDTO lessonReqDTO) {
        lessonService.updateLesson(id, lessonReqDTO);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLesson(@PathVariable String id) {
        lessonService.deleteLesson(id);
        return ResponseEntity.noContent().build();
    }
}
