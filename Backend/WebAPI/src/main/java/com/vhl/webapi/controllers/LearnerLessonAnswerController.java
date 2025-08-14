package com.vhl.webapi.controllers;

import com.vhl.webapi.dtos.requests.LearnerLessonAnswerReqDTO;
import com.vhl.webapi.dtos.responses.LearnerLessonAnswerResDTO;
import com.vhl.webapi.services.abstraction.LearnerLessonAnswerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learner-lesson-answers")
@RequiredArgsConstructor
public class LearnerLessonAnswerController {
    private final LearnerLessonAnswerService learnerLessonAnswerService;

    @PostMapping("/batch")
    public ResponseEntity<?> createBatch(@Valid @RequestBody List<LearnerLessonAnswerReqDTO> learnerLessonAnswerReqDTOS) {
        List<LearnerLessonAnswerResDTO> learnerLessonAnswerResDTOS = learnerLessonAnswerService.createBatch(learnerLessonAnswerReqDTOS);
        return ResponseEntity.status(HttpStatus.CREATED).body(learnerLessonAnswerResDTOS);
    }

    @GetMapping("")
    public ResponseEntity<?> getByRequestParams(
        @RequestParam String learnerId,
        @RequestParam(required = false) String lessonId
    ) {
        List<LearnerLessonAnswerResDTO> learnerLessonAnswerResDTOS;
        if (lessonId == null) {
            learnerLessonAnswerResDTOS = learnerLessonAnswerService.getByLearnerId(learnerId);
        } else {
            learnerLessonAnswerResDTOS = learnerLessonAnswerService.getByLearnerAndLessonId(learnerId, lessonId);
        }
        return ResponseEntity.ok(learnerLessonAnswerResDTOS);
    }

}
