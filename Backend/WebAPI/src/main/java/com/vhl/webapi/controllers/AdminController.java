package com.vhl.webapi.controllers;

import com.vhl.webapi.dtos.requests.UpdateAdminLevelReqDTO;
import com.vhl.webapi.dtos.responses.UpdateAdminLevelResDTO;
import com.vhl.webapi.services.abstraction.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admins")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAdminLevel(
        @PathVariable String id,
        @RequestBody UpdateAdminLevelReqDTO updateAdminLevelReqDTO
    ) {
        UpdateAdminLevelResDTO updateAdminLevelResDTO = adminService.updateAdminLevel(id, updateAdminLevelReqDTO);
        return ResponseEntity.ok(updateAdminLevelResDTO);
    }
}
