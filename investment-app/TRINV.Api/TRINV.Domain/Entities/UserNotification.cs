namespace TRINV.Domain.Entities;

public class UserNotification : BaseEntity
{
    public int UserId { get; set; }

    public int NotificationId { get; set; }
}
