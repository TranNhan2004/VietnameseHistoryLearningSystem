package com.vhl.webapi.controllers;

import com.vhl.webapi.dtos.requests.ResultReqDTO;
import com.vhl.webapi.dtos.requests.UpdateResultReqDTO;
import com.vhl.webapi.dtos.responses.ResultResDTO;
import com.vhl.webapi.services.abstraction.ResultService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@RequiredArgsConstructor
public class ResultController {
    private final ResultService resultService;

    @PostMapping("")
    public ResponseEntity<?> createResult(@Valid @RequestBody ResultReqDTO resultReqDTO) {
        ResultResDTO resultResDTO = resultService.createResult(resultReqDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(resultResDTO);
    }

    @GetMapping("/search")
    public ResponseEntity<?> getAllResultsByRequestParams(
        @RequestParam(required = false) String learnerId,
        @RequestParam(required = false) String contestId
    ) {
        if (learnerId == null && contestId == null) {
            return ResponseEntity.badRequest().build();
        } else if (learnerId != null) {
            List<ResultResDTO> resultResDTOS = resultService.getResultsByLearnerId(learnerId);
            return ResponseEntity.ok(resultResDTOS);
        } else if (contestId != null) {
            List<ResultResDTO> resultResDTOS = resultService.getResultsByContestId(contestId);
            return ResponseEntity.ok(resultResDTOS);
        } else {
            ResultResDTO resultResDTO = resultService.getResultByLearnerAndContestId(learnerId, contestId);
            return ResponseEntity.ok(resultResDTO);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getResultById(@PathVariable String id) {
        ResultResDTO resultResDTO = resultService.getResultById(id);
        return ResponseEntity.ok(resultResDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateResult(@PathVariable String id, @Valid @RequestBody UpdateResultReqDTO updateResultReqDTO) {
        ResultResDTO resultResDTO = resultService.updateResult(id, updateResultReqDTO);
        return ResponseEntity.ok(resultResDTO);
    }

}
