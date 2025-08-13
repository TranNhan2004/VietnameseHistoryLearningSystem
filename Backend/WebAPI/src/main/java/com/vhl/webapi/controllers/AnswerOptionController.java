package com.vhl.webapi.controllers;


import com.vhl.webapi.dtos.requests.IdsReqDTO;
import com.vhl.webapi.services.abstraction.AnswerOptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/answer-options")
@RequiredArgsConstructor
public class AnswerOptionController {
    private final AnswerOptionService answerOptionService;

    @PostMapping
    public ResponseEntity<?> getAnswerOptionsByIds(@RequestBody IdsReqDTO idsReqDTO) {
        return ResponseEntity.ok(answerOptionService.getAnswerOptionsByIds(idsReqDTO));
    }

    @PreAuthorize("@roleChecker.hasRolePrefix('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAnswerOption(@PathVariable String id) {
        answerOptionService.deleteAnswerOption(id);
        return ResponseEntity.noContent().build();
    }

}
