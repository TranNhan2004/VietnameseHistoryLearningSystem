package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.BaseUserErrorCode;
import com.vhl.webapi.constants.errorcodes.VerificationErrorCode;
import com.vhl.webapi.constants.regexps.BaseUserRegExp;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class VerificationReqDTO {
    @NotBlank(message = VerificationErrorCode.OTP__REQUIRED)
    private String otp;

    @NotBlank(message = BaseUserErrorCode.EMAIL__REQUIRED)
    @Pattern(regexp = BaseUserRegExp.EMAIL, message = BaseUserErrorCode.EMAIL__INVALID)
    private String email;
}
