using TRINV.Shared.Business.Exceptions.Interfaces;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Shared.Business.Exceptions;

public class ForbiddenAccessException : IError
{
    private const int UniqueKey = ErrorCode.Forbidden;

    public int Key => UniqueKey;

    public string Message { get; set; } = "You do not have permission to access this resource";

    public ForbiddenAccessException(string? customMessage = null)
    {
        this.Message = customMessage ?? this.Message;
    }
}
