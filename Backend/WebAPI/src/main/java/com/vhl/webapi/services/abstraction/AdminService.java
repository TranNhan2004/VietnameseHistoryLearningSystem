package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.UpdateAdminLevelReqDTO;

public interface AdminService {
    void updateAdminLevel(String id, UpdateAdminLevelReqDTO updateAdminLevelReqDTO);
}
