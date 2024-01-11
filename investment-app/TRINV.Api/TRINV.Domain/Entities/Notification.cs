namespace TRINV.Domain.Entities;

using Enums;

public class Notification : BaseEntity
{
    public int UserId { get; set; }

    public NotificationType NotificationType { get; set; }

    public string Message { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    public bool IsRead { get; set; } //IsSeen / IsRead / IsUnread 

    public bool IsDeleted { get; set; }
}
