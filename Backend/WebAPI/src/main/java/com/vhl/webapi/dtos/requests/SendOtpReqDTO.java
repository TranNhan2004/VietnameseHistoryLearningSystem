package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.BaseUserErrorCode;
import com.vhl.webapi.constants.regexps.BaseUserRegExp;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class SendOtpReqDTO {
    @NotBlank(message = BaseUserErrorCode.EMAIL__REQUIRED)
    @Pattern(regexp = BaseUserRegExp.EMAIL, message = BaseUserErrorCode.EMAIL__INVALID)
    private String email;

    @NotBlank(message = BaseUserErrorCode.EMAIL__REQUIRED)
    @Pattern(regexp = BaseUserRegExp.USER_NAME, message = BaseUserErrorCode.USER_NAME__INVALID)
    private String userName;
}
