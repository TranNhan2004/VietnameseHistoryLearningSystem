package com.vhl.webapi.controllers;

import com.vhl.webapi.dtos.requests.StudyProgressReqDTO;
import com.vhl.webapi.dtos.responses.StudyProgressResDTO;
import com.vhl.webapi.services.abstraction.StudyProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/study-progresses")
@RequiredArgsConstructor
public class StudyProgressController {
    private final StudyProgressService studyProgressService;

    @GetMapping("")
    public ResponseEntity<?> getStudyProgresssByLearner(@RequestParam String learnerId) {
        List<StudyProgressResDTO> studyProgressResDTOS = studyProgressService.getStudyProgresssByLearner(learnerId);
        return ResponseEntity.ok(studyProgressResDTOS);
    }

    @PostMapping("")
    public ResponseEntity<?> addStudyProgress(@RequestBody StudyProgressReqDTO studyProgressReqDTO) {
        StudyProgressResDTO studyProgressResDTO = studyProgressService.createStudyProgress(studyProgressReqDTO);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(studyProgressResDTO.getId())
            .toUri();

        return ResponseEntity.created(location).body(studyProgressResDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudyProgress(@PathVariable String id, @RequestBody StudyProgressReqDTO studyProgressReqDTO) {
        studyProgressService.updateStudyProgress(id, studyProgressReqDTO);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudyProgress(@PathVariable String id) {
        studyProgressService.deleteStudyProgress(id);
        return ResponseEntity.noContent().build();
    }
}
