package com.vhl.webapi.controllers;

import com.vhl.webapi.dtos.requests.HistoricalPeriodReqDTO;
import com.vhl.webapi.dtos.responses.HistoricalPeriodResDTO;
import com.vhl.webapi.services.abstraction.HistoricalPeriodService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/historical-periods")
@RequiredArgsConstructor
public class HistoricalPeriodController {
    private final HistoricalPeriodService historicalPeriodService;

    @GetMapping("")
    public ResponseEntity<?> getAllHistoricalPeriods() {
        List<HistoricalPeriodResDTO> historicalPeriodResDTOS = historicalPeriodService.getHistoricalPeriods();
        return ResponseEntity.ok(historicalPeriodResDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getHistoricalPeriodById(@PathVariable String id) {
        HistoricalPeriodResDTO historicalPeriodResDTO = historicalPeriodService.getHistoricalPeriodById(id);
        return ResponseEntity.ok(historicalPeriodResDTO);
    }

    @PreAuthorize("@roleChecker.hasRolePrefix('ADMIN')")
    @PostMapping("")
    public ResponseEntity<?> createHistoricalPeriod(@Valid @RequestBody HistoricalPeriodReqDTO historicalPeriodReqDTO) {
        HistoricalPeriodResDTO historicalPeriodResDTO = historicalPeriodService.createHistoricalPeriod(historicalPeriodReqDTO);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(historicalPeriodResDTO.getId())
            .toUri();

        return ResponseEntity.created(location).body(historicalPeriodResDTO);
    }

    @PreAuthorize("@roleChecker.hasRolePrefix('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateHistoricalPeriod(
        @PathVariable String id,
        @Valid @RequestBody HistoricalPeriodReqDTO historicalPeriodReqDTO
    ) {
        historicalPeriodService.updateHistoricalPeriod(id, historicalPeriodReqDTO);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("@roleChecker.hasRolePrefix('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHistoricalPeriod(@PathVariable String id) {
        historicalPeriodService.deleteHistoricalPeriod(id);
        return ResponseEntity.noContent().build();
    }
}
