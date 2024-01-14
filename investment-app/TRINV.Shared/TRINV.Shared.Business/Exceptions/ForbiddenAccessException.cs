using TRINV.Shared.Business.Exceptions.Interfaces;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Shared.Business.Exceptions;

public class ForbiddenAccessException : IError
{
    public ForbiddenAccessException(string? customMessage = null)
        :base(ErrorCode.Forbidden.ToString(), (int)ErrorCode.BadRequest, "You do not have permission to access this resource")
    {
        this.Message = customMessage ?? this.Message;
    }
}
