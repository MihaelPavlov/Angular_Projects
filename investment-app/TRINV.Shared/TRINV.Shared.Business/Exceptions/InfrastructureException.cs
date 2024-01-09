using TRINV.Shared.Business.Exceptions.Interfaces;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Shared.Business.Exceptions;

public class InfrastructureException : IError
{
    private const int UniqueKey = ErrorCode.Infrustucture;

    public int Key => UniqueKey;

    public string Message { get; set; } = "Issues within a system's infrastructure";

    public InfrastructureException(string? customMessage = null)
    {
        this.Message = customMessage ?? this.Message;
    }
}
