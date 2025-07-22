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
    public ResponseEntity<?> createImage(@Valid @RequestBody ImageReqDTO imageReqDTO) {
        ImageResDTO imageResDTO = imageService.createImage(imageReqDTO);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(imageResDTO.getId())
            .toUri();

        return ResponseEntity.created(location).body(imageResDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> uploadImage(
        @PathVariable String id,
        @Valid @RequestBody ImageReqDTO imageReqDTO
    ) {
        imageService.updateImage(id, imageReqDTO);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable String id) {
        imageService.deleteImage(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/file/{id}")
    public ResponseEntity<?> uploadImageFile(
        @PathVariable String id,
        @RequestParam("image") MultipartFile file
    ) {
        ImageResDTO imageResDTO = imageService.uploadImageFile(id, file);
        return ResponseEntity.ok(imageResDTO);
    }

    @DeleteMapping("file/{id}")
    public ResponseEntity<?> deleteImageFile(@PathVariable String id) {
        imageService.deleteImageFile(id);
        return ResponseEntity.noContent().build();
    }
}
