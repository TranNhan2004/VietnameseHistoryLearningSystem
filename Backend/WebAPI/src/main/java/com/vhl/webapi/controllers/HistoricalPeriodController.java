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

@RestController
@RequestMapping("/api/historical-periods")
@RequiredArgsConstructor
public class HistoricalPeriodController {
    private final HistoricalPeriodService historicalPeriodService;

    @GetMapping("")
    public ResponseEntity<?> getAllHistoricalPeriods() {
        return ResponseEntity.ok(historicalPeriodService.getHistoricalPeriods());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getHistoricalPeriodById(@PathVariable String id) {
        return ResponseEntity.ok(historicalPeriodService.getHistoricalPeriodById(id));
    }

    @PreAuthorize("@roleChecker.hasFullRole('ADMIN')")
    @PostMapping("/{id}")
    public ResponseEntity<?> createHistoricalPeriod(@Valid @RequestBody HistoricalPeriodReqDTO historicalPeriodReqDTO) {
        HistoricalPeriodResDTO data = historicalPeriodService.createHistoricalPeriod(historicalPeriodReqDTO);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(data.getId())
            .toUri();

        return ResponseEntity.created(location).body(data);
    }

    @PreAuthorize("@roleChecker.hasFullRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateHistoricalPeriod(
        @PathVariable String id,
        @Valid @RequestBody HistoricalPeriodReqDTO historicalPeriodReqDTO
    ) {
        historicalPeriodService.updateHistoricalPeriod(id, historicalPeriodReqDTO);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("@roleChecker.hasFullRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHistoricalPeriod(@PathVariable String id) {
        historicalPeriodService.deleteHistoricalPeriod(id);
        return ResponseEntity.noContent().build();
    }
}
