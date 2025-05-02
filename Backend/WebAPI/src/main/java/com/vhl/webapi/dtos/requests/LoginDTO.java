package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.BaseUserErrorCode;
import com.vhl.webapi.constants.regexps.BaseUserRegExp;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginDTO {
    @NotBlank(message = BaseUserErrorCode.EMAIL_OR_USER_NAME__REQUIRED)
    @Pattern(regexp = BaseUserRegExp.EMAIL_OR_USER_NAME__REG_EXP, message = BaseUserErrorCode.EMAIL_OR_USER_NAME__INVALID)
    private String emailOrUserName;

    @NotBlank(message = BaseUserErrorCode.PASSWORD__REQUIRED)
    @Size(min = 8, max = 50, message = BaseUserErrorCode.PASSWORD__TOO_SHORT_OR_LONG)
    @Pattern(regexp = BaseUserRegExp.PASSWORD__REG_EXP, message = BaseUserErrorCode.PASSWORD__INVALID)
    private String password;

    @NotBlank(message = BaseUserErrorCode.TYPE__REQUIRED)
    @Pattern(regexp = BaseUserRegExp.TYPE__REG_EXP, message = BaseUserErrorCode.TYPE__INVALID)
    private String type;
}
