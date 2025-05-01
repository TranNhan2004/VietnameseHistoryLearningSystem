package com.vhl.webapi.dtos.requests;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.vhl.webapi.constants.errorcodes.BaseUserErrorCode;
import com.vhl.webapi.constants.regexps.BaseUserRegExp;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
    @JsonSubTypes.Type(value = AdminDTO.class, name = "ADMIN"),
    @JsonSubTypes.Type(value = LearnerDTO.class, name = "LEARNER")
})
public abstract class BaseUserDTO {
    @NotBlank(message = BaseUserErrorCode.USER_NAME__REQUIRED)
    @Size(max = 64, message = BaseUserErrorCode.USER_NAME__TOO_LONG)
    @Pattern(regexp = BaseUserRegExp.USER_NAME__REG_EXP, message = BaseUserErrorCode.USER_NAME__INVALID)
    protected String userName;

    @NotBlank(message = BaseUserErrorCode.EMAIL__REQUIRED)
    @Size(max = 256, message = BaseUserErrorCode.EMAIL__TOO_LONG)
    @Pattern(regexp = BaseUserRegExp.EMAIL__REG_EXP, message = BaseUserErrorCode.EMAIL__INVALID)
    protected String email;

    @NotBlank(message = BaseUserErrorCode.PASSWORD__REQUIRED)
    @Size(min = 8, max = 50, message = BaseUserErrorCode.PASSWORD__TOO_SHORT_OR_LONG)
    @Pattern(regexp = BaseUserRegExp.PASSWORD__REG_EXP, message = BaseUserErrorCode.PASSWORD__INVALID)
    protected String password;

    @NotBlank(message = BaseUserErrorCode.FIRST_NAME__REQUIRED)
    @Size(max = 50, message = BaseUserErrorCode.FIRST_NAME__TOO_LONG)
    protected String firstName;

    @NotBlank(message = BaseUserErrorCode.LAST_NAME__REQUIRED)
    @Size(max = 100, message = BaseUserErrorCode.LAST_NAME__TOO_LONG)
    protected String lastName;

    @Past(message = BaseUserErrorCode.DOB__INVALID)
    protected LocalDate dateOfBirth;

    @Size(max = 2048, message = BaseUserErrorCode.AVATAR_URL__TOO_LONG)
    protected String avatarUrl;
}
