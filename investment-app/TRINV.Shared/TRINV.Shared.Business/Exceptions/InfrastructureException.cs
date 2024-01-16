using TRINV.Shared.Business.Exceptions.Interfaces;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Shared.Business.Exceptions;

public class InfrastructureException : IError
{
    public InfrastructureException(string? customMessage = null)
          : base(ErrorCode.Infrustucture.ToString(), (int)ErrorCode.Infrustucture, "Issues within a system's infrastructure")
    {
        this.Message = customMessage ?? this.Message;
    }
}
