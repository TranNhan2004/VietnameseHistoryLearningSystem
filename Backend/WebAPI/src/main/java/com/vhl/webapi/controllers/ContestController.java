package com.vhl.webapi.controllers;

import com.vhl.webapi.dtos.requests.ContestReqDTO;
import com.vhl.webapi.dtos.requests.IdsReqDTO;
import com.vhl.webapi.dtos.responses.ContestResDTO;
import com.vhl.webapi.services.abstraction.ContestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/contests")
@RequiredArgsConstructor
public class ContestController {
    private final ContestService contestService;

    @GetMapping("")
    public ResponseEntity<?> getAllContests() {
        List<ContestResDTO> contestResDTOS = contestService.getAllContests();
        return ResponseEntity.ok(contestResDTOS);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getContestById(@PathVariable String id) {
        ContestResDTO contestResDTO = contestService.getContestById(id);
        return ResponseEntity.ok(contestResDTO);
    }

    @PostMapping("/by-ids")
    public ResponseEntity<?> getContestsByName(@RequestBody IdsReqDTO idsReqDTO) {
        List<ContestResDTO> contestResDTOS = contestService.getAllByIds(idsReqDTO);
        return ResponseEntity.ok(contestResDTOS);
    }

    @PreAuthorize("@roleChecker.hasRolePrefix('ADMIN')")
    @PostMapping("")
    public ResponseEntity<?> createContest(@Valid @RequestBody ContestReqDTO contestReqDTO) {
        ContestResDTO contestResDTO = contestService.createContest(contestReqDTO);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(contestResDTO.getId())
            .toUri();

        return ResponseEntity.created(location).body(contestResDTO);
    }


    @PreAuthorize("@roleChecker.hasRolePrefix('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateContest(@PathVariable String id, @Valid @RequestBody ContestReqDTO contestReqDTO) {
        contestService.updateContest(id, contestReqDTO);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("@roleChecker.hasRolePrefix('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContest(@PathVariable String id) {
        contestService.deleteContest(id);
        return ResponseEntity.noContent().build();
    }
}
