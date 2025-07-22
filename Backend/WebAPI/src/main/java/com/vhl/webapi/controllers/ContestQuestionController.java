package com.vhl.webapi.controllers;

import com.vhl.webapi.dtos.requests.ContestQuestionReqDTO;
import com.vhl.webapi.dtos.responses.ContestQuestionResDTO;
import com.vhl.webapi.services.abstraction.ContestQuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/contest-questions")
@RequiredArgsConstructor
public class ContestQuestionController {
    private final ContestQuestionService contestQuestionService;

    @GetMapping("")
    public ResponseEntity<?> getAllContestQuestions(@RequestParam String contestId) {
        List<ContestQuestionResDTO> contestQuestionResDTOS =
            contestQuestionService.getAllContestQuestionsByContestId(contestId);
        return ResponseEntity.ok(contestQuestionResDTOS);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getContestQuestionById(@PathVariable String id) {
        ContestQuestionResDTO contestQuestionResDTO = contestQuestionService.getContestQuestionById(id);
        return ResponseEntity.ok(contestQuestionResDTO);
    }

    @PreAuthorize("@roleChecker.hasRolePrefix('ADMIN')")
    @PostMapping("")
    public ResponseEntity<?> createContestQuestion(@Valid @RequestBody ContestQuestionReqDTO contestQuestionReqDTO) {
        ContestQuestionResDTO contestQuestionResDTO = contestQuestionService.createContestQuestion(contestQuestionReqDTO);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(contestQuestionResDTO.getId())
            .toUri();

        return ResponseEntity.created(location).body(contestQuestionResDTO);
    }


    @PreAuthorize("@roleChecker.hasRolePrefix('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateContestQuestion(@PathVariable String id, @Valid @RequestBody ContestQuestionReqDTO contestQuestionReqDTO) {
        contestQuestionService.updateContestQuestion(id, contestQuestionReqDTO);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("@roleChecker.hasRolePrefix('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContestQuestion(@PathVariable String id) {
        contestQuestionService.deleteContestQuestion(id);
        return ResponseEntity.noContent().build();
    }
}
