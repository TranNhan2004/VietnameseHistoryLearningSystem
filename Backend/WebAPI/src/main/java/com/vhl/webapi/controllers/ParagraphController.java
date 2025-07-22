package com.vhl.webapi.controllers;

import com.vhl.webapi.dtos.requests.ParagraphReqDTO;
import com.vhl.webapi.dtos.responses.ParagraphResDTO;
import com.vhl.webapi.services.abstraction.ParagraphService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/paragraphs")
@RequiredArgsConstructor
public class ParagraphController {
    private final ParagraphService paragraphService;

    @PostMapping("")
    public ResponseEntity<?> createParagraph(@Valid @RequestBody ParagraphReqDTO paragraphReqDTO) {
        ParagraphResDTO paragraphResDTO = paragraphService.createParagraph(paragraphReqDTO);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(paragraphResDTO.getId())
            .toUri();

        return ResponseEntity.created(location).body(paragraphResDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateParagraph(@PathVariable String id, @Valid @RequestBody ParagraphReqDTO paragraphReqDTO) {
        paragraphService.updateParagraph(id, paragraphReqDTO);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteParagraph(@PathVariable String id) {
        paragraphService.deleteParagraph(id);
        return ResponseEntity.noContent().build();
    }
}
