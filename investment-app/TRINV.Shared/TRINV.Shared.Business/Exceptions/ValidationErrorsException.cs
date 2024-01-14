using TRINV.Shared.Business.Exceptions.Interfaces;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Shared.Business.Exceptions;

public class ValidationErrorsException : IError
{
    public ValidationErrorsException(string? customMessage = null)
     : base(ErrorCode.Validation.ToString(), (int)ErrorCode.Validation, "One or more validation failures have occurred.")
    {
        this.Message = customMessage ?? this.Message;
    }
}
