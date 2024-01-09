using TRINV.Shared.Business.Exceptions.Interfaces;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Shared.Business.Exceptions;

public class BadRequestException : IError
{
    private const int UniqueKey = ErrorCode.BadRequest;

    public int Key => UniqueKey;

    public string Message { get; set; } = "Server cannot or will not process the request";

    public BadRequestException(string? customMessage = null)
    {
        this.Message = customMessage ?? this.Message;
    }
}
