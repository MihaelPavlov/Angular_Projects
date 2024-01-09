using TRINV.Shared.Business.Exceptions.Interfaces;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Shared.Business.Exceptions;

public class NotFoundException : IError
{
    private const int UniqueKey = ErrorCode.NotFound;

    public int Key => UniqueKey;

    public string Message { get; set; } = "Item was not found";

    public NotFoundException(string? customMessage = null)
    {
        this.Message = customMessage ?? this.Message;
    }
}
