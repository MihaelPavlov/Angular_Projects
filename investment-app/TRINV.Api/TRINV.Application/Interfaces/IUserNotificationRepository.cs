namespace TRINV.Application.Interfaces;

using Domain.Entities;

public interface IUserNotificationRepository
{
    Task<IEnumerable<UserNotification>> GetAllNotificationsForUserAsync(int userId, CancellationToken cancellationToken);

    Task<UserNotification> GetUserNotificationByIdAsync(int notificationId, int userId, CancellationToken cancellationToken);

    Task CreateUserNotificationAsync(UserNotification userNotification, CancellationToken cancellationToken);

    bool DeleteNotification(int notificationId, int userId);

    bool DeleteAllNotificationsForUser(int userId);
}
