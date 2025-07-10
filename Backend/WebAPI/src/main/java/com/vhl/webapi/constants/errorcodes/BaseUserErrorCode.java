package com.vhl.webapi.constants.errorcodes;

public class BaseUserErrorCode {
    public static final String ID__REQUIRED = "ID__REQUIRED";
    public static final String USER_NAME__REQUIRED = "USER_NAME__REQUIRED";
    public static final String EMAIL__REQUIRED = "EMAIL__REQUIRED";
    public static final String EMAIL_OR_USER_NAME__REQUIRED = "EMAIL_OR_USER_NAME__REQUIRED";
    public static final String PASSWORD__REQUIRED = "PASSWORD__REQUIRED";
    public static final String FIRST_NAME__REQUIRED = "FIRST_NAME__REQUIRED";
    public static final String LAST_NAME__REQUIRED = "LAST_NAME__REQUIRED";
    public static final String ROLE__REQUIRED = "ROLE__REQUIRED";
    public static final String FULL_ROLE__REQUIRED = "FULL_ROLE__REQUIRED";
    public static final String OLD_PASSWORD__REQUIRED = "OLD_PASSWORD__REQUIRED";
    public static final String NEW_PASSWORD__REQUIRED = "NEW_PASSWORD__REQUIRED";
    public static final String CONFIRM_NEW_PASSWORD__REQUIRED = "CONFIRM_NEW_PASSWORD__REQUIRED";

    public static final String USER_NAME__ALREADY_EXISTS = "USER_NAME__ALREADY_EXISTS";
    public static final String EMAIL__ALREADY_EXISTS = "EMAIL__ALREADY_EXISTS";

    public static final String USER_NAME__INVALID = "USER_NAME__INVALID";
    public static final String EMAIL__INVALID = "EMAIL__INVALID";
    public static final String EMAIL_OR_USER_NAME__INVALID = "EMAIL_OR_USER_NAME__INVALID";
    public static final String PASSWORD__INVALID = "PASSWORD__INVALID";
    public static final String DOB__INVALID = "DOB__INVALID";
    public static final String ROLE__INVALID = "ROLE__INVALID";

    public static final String EMAIL_OR_USER_NAME_OR_PASSWORD__INCORRECT = "EMAIL_OR_USER_NAME_OR_PASSWORD__INCORRECT";

    public static final String USER_NAME__TOO_LONG = "USER_NAME__TOO_LONG";
    public static final String EMAIL__TOO_LONG = "EMAIL__TOO_LONG";
    public static final String PASSWORD__TOO_SHORT_OR_LONG = "PASSWORD__TOO_SHORT_OR_LONG";
    public static final String FIRST_NAME__TOO_LONG = "FIRST_NAME__TOO_LONG";
    public static final String LAST_NAME__TOO_LONG = "LAST_NAME__TOO_LONG";
    public static final String AVATAR_URL__TOO_LONG = "AVATAR_URL__TOO_LONG";

    public static final String BASE_USER__NOT_FOUND = "BASE_USER__NOT_FOUND";
    public static final String HAS_BEEN_ACTIVE = "HAS_BEEN_ACTIVE";

    public static final String AVATAR__UPLOAD_FAILED = "AVATAR__UPLOAD_FAILED";
    public static final String AVATAR__DELETE_FAILED = "AVATAR__DELETE_FAILED";

    public static final String OLD_PASSWORD__INVALID = "OLD_PASSWORD__INVALID";
    public static final String NEW_PASSWORD__INVALID = "NEW_PASSWORD__INVALID";
    public static final String CONFIRM_NEW_PASSWORD__INVALID = "CONFIRM_NEW_PASSWORD__INVALID";

    public static final String OLD_PASSWORD__NOT_CORRECT = "OLD_PASSWORD__NOT_CORRECT";
}
