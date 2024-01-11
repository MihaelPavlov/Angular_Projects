namespace TRINV.Domain.Entities;

using System.ComponentModel.DataAnnotations;

public class UserNotification : BaseEntity
{
    [Required]
    public int UserId { get; set; }

    [Required]
    public int NotificationId { get; set; }
}
