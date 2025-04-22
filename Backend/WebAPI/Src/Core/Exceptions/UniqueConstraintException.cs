using Core.Constants.ErrorCodes;

namespace Core.Exceptions;

public class UniqueConstraintException : Exception
{
    public string ErrorCode { get; }

    public UniqueConstraintException(string errorCode)
        : base(GeneralErrorCodes.UniqueConstraintViolation)
    {
        ErrorCode = errorCode;
    }

    public UniqueConstraintException(string errorCode, string message)
        : base(message)
    {
        ErrorCode = errorCode;
    }

    public UniqueConstraintException(string errorCode, string message, Exception innerException)
        : base(message, innerException)
    {
        ErrorCode = errorCode;
    }

}