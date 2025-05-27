package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.AdminErrorCode;
import com.vhl.webapi.enums.AdminLevel;
import com.vhl.webapi.utils.annotations.validation.ValidEnum;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AdminReqDTO extends BaseUserReqDTO {
    @NotNull(message = AdminErrorCode.ADMIN_LEVEL__REQUIRED)
    @ValidEnum(enumClass = AdminLevel.class, message = AdminErrorCode.ADMIN_LEVEL__INVALID)
    private String adminLevel;
}
