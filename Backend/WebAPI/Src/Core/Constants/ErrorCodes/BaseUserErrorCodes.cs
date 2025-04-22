namespace Core.Constants.ErrorCodes;

public static class BaseUserErrorCodes
{
    // Existing error codes
    public const string EmailAlreadyExists = "EMAIL_ALREADY_EXISTS";
    public const string UserNameAlreadyExists = "USER_NAME_ALREADY_EXISTS";

    // NotNull validation error codes
    public const string UserNameNotNull = "USER_NAME_NOT_NULL";
    public const string EmailNotNull = "EMAIL_NOT_NULL";
    public const string PasswordNotNull = "PASSWORD_NOT_NULL";
    public const string FirstNameNotNull = "FIRST_NAME_NOT_NULL";
    public const string LastNameNotNull = "LAST_NAME_NOT_NULL";
    public const string DateOfBirthStringNotNull = "DATE_OF_BIRTH_STRING_NOT_NULL";

    // Length validation error codes
    public const string UserNameLengthExceeded = "USER_NAME_LENGTH_EXCEEDED";
    public const string EmailLengthExceeded = "EMAIL_LENGTH_EXCEEDED";
    public const string PasswordLengthExceeded = "PASSWORD_LENGTH_EXCEEDED";
    public const string PasswordLengthTooShort = "PASSWORD_LENGTH_TOO_SHORT";
    public const string FirstNameLengthExceeded = "FIRST_NAME_LENGTH_EXCEEDED";
    public const string LastNameLengthExceeded = "LAST_NAME_LENGTH_EXCEEDED";

    // Format validation error codes
    public const string EmailInvalid = "EMAIL_INVALID";
    public const string UserNameInvalid = "USER_NAME_INVALID";
    public const string PasswordInvalid = "PASSWORD_INVALID";
    public const string DateOfBirthStringInvalid = "DATE_OF_BIRTH_STRING_INVALID";
}