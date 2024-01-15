namespace TRINV.Domain.Entities;

using System.ComponentModel.DataAnnotations;

public class UserNotification
{
    [Required]
    public int UserId { get; set; }

    [Required]
    public int NotificationId { get; set; }

    public DateTime ReceivedDate { get; set; }

    public bool HasSeenNotification { get; set; } // IsSeen, IsChecked, IsRead, IsNotificationSeen

    public bool IsDeleted { get; set; }
}