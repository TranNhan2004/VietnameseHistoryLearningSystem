package com.vhl.webapi.constants.regexps;

public class BaseUserRegExp {
    public static final String EMAIL__REG_EXP = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    public static final String USER_NAME__REG_EXP = "^[a-zA-Z0-9]+$";
    public static final String EMAIL_OR_USER_NAME__REG_EXP = "^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}|[a-zA-Z0-9]+)$";
    public static final String PASSWORD__REG_EXP = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?]).+$";
    public static final String TYPE__REG_EXP = "^(ADMIN|LEARNER)$";
}
