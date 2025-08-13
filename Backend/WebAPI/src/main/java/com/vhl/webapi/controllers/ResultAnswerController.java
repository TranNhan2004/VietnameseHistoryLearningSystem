package com.vhl.webapi.controllers;

import com.vhl.webapi.dtos.requests.ResultAnswerReqDTO;
import com.vhl.webapi.dtos.responses.ResultAnswerResDTO;
import com.vhl.webapi.services.abstraction.ResultAnswerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/result-answers")
@RequiredArgsConstructor
public class ResultAnswerController {
    private final ResultAnswerService resultAnswerService;

    @PostMapping("/batch")
    public ResponseEntity<?> createBatch(@Valid @RequestBody List<ResultAnswerReqDTO> resultAnswerReqDTOS) {
        List<ResultAnswerResDTO> resultAnswerResDTOS = resultAnswerService.createBatch(resultAnswerReqDTOS);
        return ResponseEntity.status(HttpStatus.CREATED).body(resultAnswerResDTOS);
    }
}
