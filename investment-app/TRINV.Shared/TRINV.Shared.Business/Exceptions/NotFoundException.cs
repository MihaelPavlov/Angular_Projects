using TRINV.Shared.Business.Exceptions.Interfaces;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Shared.Business.Exceptions;

public class NotFoundException : IError
{
    public NotFoundException(string? customMessage = null)
         : base(ErrorCode.NotFound.ToString(), (int)ErrorCode.NotFound, "Item was not found")
    {
        this.Message = customMessage ?? this.Message;
    }
}
