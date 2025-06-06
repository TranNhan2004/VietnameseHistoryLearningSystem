package com.vhl.webapi.controllers;

import com.vhl.webapi.dtos.responses.BaseUserResDTO;
import com.vhl.webapi.services.abstraction.BaseUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final BaseUserService baseUserService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable String id) {
        BaseUserResDTO baseUserResDTO = baseUserService.getUser(id);
        return ResponseEntity.ok(baseUserResDTO);
    }

    @PutMapping("/avatar/{id}")
    public ResponseEntity<?> updateAvatar(@PathVariable String id, @RequestParam("avatar") MultipartFile file) {
        String url = baseUserService.updateAvatar(id, file);
        return ResponseEntity.ok(url);
    }

    @DeleteMapping("/avatar/{id}")
    public ResponseEntity<?> deleteAvatar(@PathVariable String id) {
        baseUserService.deleteAvatar(id);
        return ResponseEntity.noContent().build();
    }
}
