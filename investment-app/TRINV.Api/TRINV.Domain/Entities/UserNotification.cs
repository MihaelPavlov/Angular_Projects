namespace TRINV.Domain.Entities;

using System.ComponentModel.DataAnnotations;

public class UserNotification : BaseEntity
{
    [Required]
    public int UserId { get; set; }

    [Required]
    public string? Message { get; set; }

    public int NotificationType { get; set; }

    public DateTime ReceivedDate { get; set; }

    public bool IsSeen { get; set; }

    public bool IsDeleted { get; set; }
}