package com.vhl.webapi.constants.errorcodes;

public class BaseUserErrorCode {
    public static final String USER_NAME_REQUIRED = "USER_NAME_REQUIRED";
    public static final String EMAIL_REQUIRED = "EMAIL_REQUIRED";
    public static final String PASSWORD_REQUIRED = "PASSWORD_REQUIRED";
    public static final String FIRST_NAME_REQUIRED = "FIRST_NAME_REQUIRED";
    public static final String LAST_NAME_REQUIRED = "LAST_NAME_REQUIRED";

    public static final String USER_NAME_ALREADY_EXISTS = "USER_NAME_ALREADY_EXISTS";
    public static final String EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS";

    public static final String USER_NAME_INVALID = "USER_NAME_INVALID";
    public static final String EMAIL_INVALID = "EMAIL_INVALID";
    public static final String PASSWORD_INVALID = "PASSWORD_INVALID";
    public static final String PASSWORD_TOO_SHORT = "PASSWORD_TOO_SHORT";
    public static final String PASSWORD_TOO_LONG = "PASSWORD_TOO_LONG";
}
