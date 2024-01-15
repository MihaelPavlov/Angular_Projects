namespace TRINV.Application.Interfaces;

using Domain.Entities;

public interface IUserNotificationRepository
{
    Task<IEnumerable<UserNotification>> GetAllNotificationsForUserAsync(int userId);

    Task<UserNotification> GetUserNotificationByIdAsync(int notificationId, int userId);

    Task AddNotificationToUserAsync(int notificationId, int userId);

    Task DeleteNotificationAsync(int notificationId, int userId);

    Task DeleteAllNotificationsForUserAsync(int userId);
}
