package com.vhl.webapi.controllers;

import com.vhl.webapi.dtos.requests.ImageReqDTO;
import com.vhl.webapi.dtos.responses.ImageResDTO;
import com.vhl.webapi.services.abstraction.ImageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {
    private final ImageService imageService;

    @PostMapping("")
    public ResponseEntity<?> uploadImage(
        @Valid @RequestPart("imageJSON") ImageReqDTO imageReqDTO,
        @RequestPart("file") MultipartFile file
    ) {
        ImageResDTO data = imageService.uploadImage(imageReqDTO, file);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(data.getId())
            .toUri();

        return ResponseEntity.created(location).body(data);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable String id) {
        imageService.deleteImage(id);
        return ResponseEntity.noContent().build();
    }
}
