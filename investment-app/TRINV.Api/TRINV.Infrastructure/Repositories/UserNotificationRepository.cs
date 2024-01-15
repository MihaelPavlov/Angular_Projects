namespace TRINV.Infrastructure.Repositories;

using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class UserNotificationRepository : IUserNotificationRepository
{
    readonly ApplicationDbContext _context;

    public UserNotificationRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<UserNotification?>> GetAllNotificationsForUserAsync(int userId, CancellationToken cancellationToken)
    {
        var userNotifications = await _context
            .UserNotifications
            .Where(x => x.UserId == userId && !x.IsDeleted)
            .ToArrayAsync(cancellationToken);

        return userNotifications;
    }

    public async Task<UserNotification?> GetUserNotificationByIdAsync(int notificationId, int userId, CancellationToken cancellationToken)
    {
        UserNotification? userNotification = await _context
            .UserNotifications
            .FirstOrDefaultAsync(x => 
                x.NotificationId == notificationId && x.UserId == userId, cancellationToken);

        return userNotification;
    }

    public async Task CreateUserNotificationAsync(UserNotification userNotification, CancellationToken cancellationToken)
    { 
        await _context
            .UserNotifications
            .AddAsync(userNotification, cancellationToken);
    }

    public bool DeleteNotification(int notificationId, int userId)
    {
        var userNotification = _context
            .UserNotifications
            .FirstOrDefault(x => x.NotificationId == notificationId && x.UserId == userId);

        if (userNotification == null) return false;

        userNotification.IsDeleted = true;
        _context.SaveChangesAsync();

        return true;
    }

    public bool DeleteAllNotificationsForUser(int userId)
    {
        var userNotifications = _context
            .UserNotifications
            .Where(x => x.UserId == userId);

        if (!userNotifications.Any()) return false;

        foreach (var userNotification in userNotifications)
        {
            userNotification.IsDeleted = true;
        }

        _context.SaveChangesAsync();
        return true;
    }
}
