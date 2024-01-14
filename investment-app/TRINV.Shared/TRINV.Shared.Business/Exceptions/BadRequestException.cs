using TRINV.Shared.Business.Exceptions.Interfaces;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Shared.Business.Exceptions;

public class BadRequestException : IError
{
    public BadRequestException(string? customMessage = null)
         : base(ErrorCode.BadRequest.ToString(), (int)ErrorCode.BadRequest, "Server cannot or will not process the request")
    {
        this.Message = customMessage ?? this.Message;
    }
}
