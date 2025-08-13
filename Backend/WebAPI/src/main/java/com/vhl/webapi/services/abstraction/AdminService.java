package com.vhl.webapi.services.abstraction;

import com.vhl.webapi.dtos.requests.UpdateAdminLevelReqDTO;
import com.vhl.webapi.dtos.responses.UpdateAdminLevelResDTO;

public interface AdminService {
    UpdateAdminLevelResDTO updateAdminLevel(String id, UpdateAdminLevelReqDTO updateAdminLevelReqDTO);
}
