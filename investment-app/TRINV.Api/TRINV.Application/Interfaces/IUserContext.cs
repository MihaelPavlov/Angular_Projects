namespace TRINV.Application.Interfaces;

public interface IUserContext
{
    int UserId { get; }
    bool IsAuthenticated { get; }
}
