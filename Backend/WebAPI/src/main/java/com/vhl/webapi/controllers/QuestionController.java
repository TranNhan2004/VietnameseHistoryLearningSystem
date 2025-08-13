package com.vhl.webapi.controllers;

import com.vhl.webapi.dtos.requests.IdsReqDTO;
import com.vhl.webapi.dtos.requests.QuestionReqDTO;
import com.vhl.webapi.dtos.requests.UpdateQuestionReqDTO;
import com.vhl.webapi.dtos.requests.UpdateQuestionsForLessonReqDTO;
import com.vhl.webapi.dtos.responses.QuestionResDTO;
import com.vhl.webapi.services.abstraction.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionService;

    @GetMapping("")
    public ResponseEntity<?> getAllQuestions() {
        List<QuestionResDTO> questionResDTOS = questionService.getAllQuestions();
        return ResponseEntity.ok(questionResDTOS);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getQuestionById(@PathVariable String id) {
        QuestionResDTO questionResDTO = questionService.getQuestionById(id);
        return ResponseEntity.ok(questionResDTO);
    }

    @PreAuthorize("@roleChecker.hasRolePrefix('ADMIN')")
    @PostMapping("")
    public ResponseEntity<?> createQuestion(@Valid @RequestBody QuestionReqDTO questionReqDTO) {
        QuestionResDTO questionResDTO = questionService.createQuestion(questionReqDTO);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(questionResDTO.getId())
            .toUri();

        return ResponseEntity.created(location).body(questionResDTO);
    }


    @PreAuthorize("@roleChecker.hasRolePrefix('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateQuestion(@PathVariable String id, @Valid @RequestBody UpdateQuestionReqDTO updateQuestionReqDTO) {
        questionService.updateQuestion(id, updateQuestionReqDTO);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("@roleChecker.hasRolePrefix('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable String id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/get-by-ids")
    public ResponseEntity<?> getQuestionsByIds(@RequestBody IdsReqDTO idsReqDTO) {
        List<QuestionResDTO> questionResDTOS = questionService.getQuestionsByIds(idsReqDTO);
        return ResponseEntity.ok(questionResDTOS);
    }

    @PutMapping("/for-lesson")
    public ResponseEntity<?> updateQuestionsForLesson(@RequestBody UpdateQuestionsForLessonReqDTO updateQuestionsForLessonReqDTO) {
        questionService.updateQuestionForLesson(updateQuestionsForLessonReqDTO);
        return ResponseEntity.noContent().build();
    }
}
