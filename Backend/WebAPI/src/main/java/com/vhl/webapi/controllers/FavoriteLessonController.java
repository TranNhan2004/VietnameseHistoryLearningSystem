package com.vhl.webapi.controllers;

import com.vhl.webapi.dtos.requests.FavoriteLessonReqDTO;
import com.vhl.webapi.dtos.responses.FavoriteLessonResDTO;
import com.vhl.webapi.services.abstraction.FavoriteLessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/favorite-lessons")
@RequiredArgsConstructor
public class FavoriteLessonController {
    private final FavoriteLessonService favoriteLessonService;

    @GetMapping("")
    public ResponseEntity<?> getFavoriteLessonsByLearner(@RequestParam String learnerId) {
        List<FavoriteLessonResDTO> favoriteLessonResDTOS = favoriteLessonService.getFavoriteLessonsByLearner(learnerId);
        return ResponseEntity.ok(favoriteLessonResDTOS);
    }

    @PostMapping("")
    public ResponseEntity<?> addFavoriteLesson(@RequestBody FavoriteLessonReqDTO favoriteLessonReqDTO) {
        FavoriteLessonResDTO favoriteLessonResDTO = favoriteLessonService.createFavoriteLesson(favoriteLessonReqDTO);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(favoriteLessonResDTO.getId())
            .toUri();

        return ResponseEntity.created(location).body(favoriteLessonResDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFavoriteLesson(@PathVariable String id) {
        favoriteLessonService.deleteFavoriteLesson(id);
        return ResponseEntity.noContent().build();
    }
}
