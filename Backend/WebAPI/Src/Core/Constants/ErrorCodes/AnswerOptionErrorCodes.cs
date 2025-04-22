namespace Core.Constants.ErrorCodes;

public static class AnswerOptionErrorCodes
{
    // NotNull validation error codes
    public const string QuestionIdNotNull = "QUESTION_ID_NOT_NULL";
    public const string ContentNotNull = "CONTENT_NOT_NULL";
    public const string IsCorrectNotNull = "IS_CORRECT_NOT_NULL";

    // Logical validation error codes
    public const string AtLeastOneCorrectAnswerRequired = "AT_LEAST_ONE_CORRECT_ANSWER_REQUIRED";
}