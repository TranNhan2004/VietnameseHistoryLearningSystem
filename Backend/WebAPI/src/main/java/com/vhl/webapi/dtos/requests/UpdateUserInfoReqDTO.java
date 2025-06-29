package com.vhl.webapi.dtos.requests;

import com.vhl.webapi.constants.errorcodes.BaseUserErrorCode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateUserInfoReqDTO {
    @NotBlank(message = BaseUserErrorCode.FIRST_NAME__REQUIRED)
    @Size(max = 50, message = BaseUserErrorCode.FIRST_NAME__TOO_LONG)
    protected String firstName;

    @NotBlank(message = BaseUserErrorCode.LAST_NAME__REQUIRED)
    @Size(max = 100, message = BaseUserErrorCode.LAST_NAME__TOO_LONG)
    protected String lastName;

    @Past(message = BaseUserErrorCode.DOB__INVALID)
    protected LocalDate dateOfBirth;
}
