namespace TRINV.Infrastructure.Repositories;

using Application.Interfaces;
using Domain.Entities;

public class UserNotificationRepository : IUserNotificationRepository
{
    readonly ApplicationDbContext _context;

    public UserNotificationRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public Task<IEnumerable<UserNotification>> GetAllNotificationsForUserAsync(int userId)
    {
        throw new NotImplementedException();
    }

    public Task<UserNotification> GetUserNotificationByIdAsync(int notificationId, int userId)
    {
        throw new NotImplementedException();
    }

    public Task AddNotificationToUserAsync(int notificationId, int userId)
    {
        throw new NotImplementedException();
    }

    public Task DeleteNotificationAsync(int notificationId, int userId)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAllNotificationsForUserAsync(int userId)
    {
        throw new NotImplementedException();
    }
}
