package com.vhl.webapi.controllers;

import com.vhl.webapi.dtos.requests.ResetPasswordReqDTO;
import com.vhl.webapi.dtos.requests.UpdatePasswordReqDTO;
import com.vhl.webapi.dtos.requests.UpdateUserInfoReqDTO;
import com.vhl.webapi.dtos.responses.AvatarResDTO;
import com.vhl.webapi.dtos.responses.BaseUserResDTO;
import com.vhl.webapi.services.abstraction.BaseUserService;
import jakarta.validation.Valid;
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

    @PutMapping("/info/{id}")
    public ResponseEntity<?> updateInfo(@PathVariable String id, @Valid @RequestBody UpdateUserInfoReqDTO updateUserInfoReqDTO) {
        baseUserService.updateInfo(id, updateUserInfoReqDTO);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/password/{id}")
    public ResponseEntity<?> updatePassword(@PathVariable String id, @Valid @RequestBody UpdatePasswordReqDTO updatePasswordReqDTO) {
        baseUserService.updatePassword(id, updatePasswordReqDTO);
        return ResponseEntity.noContent().build();
    }


    @PutMapping("/avatar/{id}")
    public ResponseEntity<?> updateAvatar(@PathVariable String id, @RequestParam("avatar") MultipartFile file) {
        String url = baseUserService.updateAvatar(id, file);
        AvatarResDTO avatarResDTO = new AvatarResDTO();
        avatarResDTO.setAvatarUrl(url);
        return ResponseEntity.ok(avatarResDTO);
    }

    @DeleteMapping("/avatar/{id}")
    public ResponseEntity<?> deleteAvatar(@PathVariable String id) {
        baseUserService.deleteAvatar(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        baseUserService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordReqDTO resetPasswordReqDTO) {
        baseUserService.resetPassword(resetPasswordReqDTO);
        return ResponseEntity.noContent().build();
    }
}
