package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.BaseUserErrorCode;
import com.vhl.webapi.constants.regexps.BaseUserRegExp;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdatePasswordReqDTO {
    @NotBlank(message = BaseUserErrorCode.OLD_PASSWORD__REQUIRED)
    @Size(min = 8, max = 50, message = BaseUserErrorCode.PASSWORD__TOO_SHORT_OR_LONG)
    @Pattern(regexp = BaseUserRegExp.PASSWORD, message = BaseUserErrorCode.OLD_PASSWORD__INVALID)
    private String oldPassword;

    @NotBlank(message = BaseUserErrorCode.NEW_PASSWORD__REQUIRED)
    @Size(min = 8, max = 50, message = BaseUserErrorCode.PASSWORD__TOO_SHORT_OR_LONG)
    @Pattern(regexp = BaseUserRegExp.PASSWORD, message = BaseUserErrorCode.NEW_PASSWORD__INVALID)
    private String newPassword;

    @NotBlank(message = BaseUserErrorCode.CONFIRM_NEW_PASSWORD__REQUIRED)
    @Size(min = 8, max = 50, message = BaseUserErrorCode.PASSWORD__TOO_SHORT_OR_LONG)
    @Pattern(regexp = BaseUserRegExp.PASSWORD, message = BaseUserErrorCode.CONFIRM_NEW_PASSWORD__INVALID)
    private String confirmNewPassword;

    @AssertTrue(message = BaseUserErrorCode.CONFIRM_NEW_PASSWORD__INVALID)
    public boolean isNewPasswordMatch() {
        if (newPassword == null || confirmNewPassword == null) {
            return true;
        }

        return newPassword.equals(confirmNewPassword);
    }
}
