using TRINV.Application.Interfaces;
using TRINV.Shared.Business.Exceptions;

namespace TRINV.Infrastructure
{
    public class UserContext : IUserContext
    {
        private readonly int? _userId;

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
                throw new ForbiddenAccessException("Can not find current user.");
            }
        }
        public bool IsAuthenticated => _userId.HasValue;
    }
}
