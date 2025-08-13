package com.vhl.webapi.constants.errorcodes;

public class ContestErrorCode {
    public static final String NAME__REQUIRED = "NAME__REQUIRED";
    public static final String DURATION_IN_MINUTES__REQUIRED = "DURATION_IN_MINUTES__REQUIRED";
    public static final String START_TIME__REQUIRED = "START_TIME__REQUIRED";
    public static final String END_TIME__REQUIRED = "END_TIME__REQUIRED";

    public static final String DURATION_IN_MINUTES__INVALID = "DURATION_IN_MINUTES__INVALID";
    public static final String END_TIME__INVALID = "END_TIME__INVALID";

    public static final String NAME__TOO_LONG = "NAME__TOO_LONG";
    public static final String DESCRIPTION__TOO_LONG = "DESCRIPTION__TOO_LONG";

    public static final String CONTEST__NOT_FOUND = "CONTEST__NOT_FOUND";
}
