package com.vhl.webapi.services.impl;

import com.vhl.webapi.constants.errorcodes.AdminErrorCode;
import com.vhl.webapi.dtos.requests.UpdateAdminLevelReqDTO;
import com.vhl.webapi.entities.specific.Admin;
import com.vhl.webapi.enums.AdminLevel;
import com.vhl.webapi.exceptions.NoInstanceFoundException;
import com.vhl.webapi.repositories.AdminRepository;
import com.vhl.webapi.services.abstraction.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final AdminRepository adminRepository;

    @Override
    public void updateAdminLevel(String id, UpdateAdminLevelReqDTO updateAdminLevelReqDTO) {
        Admin admin = adminRepository.findById(id)
            .orElseThrow(() -> new NoInstanceFoundException(AdminErrorCode.ADMIN__NOT_FOUND));

        admin.setAdminLevel(AdminLevel.valueOf(updateAdminLevelReqDTO.getAdminLevel()));
        adminRepository.save(admin);
    }
}
