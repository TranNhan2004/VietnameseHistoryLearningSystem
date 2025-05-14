package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.BaseUserErrorCode;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RefreshAccessTokenDTO {
    @NotBlank(message = BaseUserErrorCode.ID__REQUIRED)
    private String id;

    @NotBlank(message = BaseUserErrorCode.FULL_ROLE__REQUIRED)
    private String fullRole;
}
