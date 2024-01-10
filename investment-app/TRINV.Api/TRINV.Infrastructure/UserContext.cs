using TRINV.Application.Interfaces;

namespace TRINV.Infrastructure;

public class UserContext : IUserContext
{
    readonly int? _userId;

    public UserContext(int? userId)
    {
        _userId = userId;
    }

    public int UserId
    {
        get
        {
            if (_userId.HasValue)
                return _userId.Value;

            throw new Exception("Can not find current user.");
        }
    }

    public bool IsAuthenticated => _userId.HasValue;
}
