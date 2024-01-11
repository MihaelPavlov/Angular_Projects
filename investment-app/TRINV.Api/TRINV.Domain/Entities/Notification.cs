namespace TRINV.Domain.Entities;

using System.ComponentModel.DataAnnotations;
using Enums;
using static Validations.EntityValidationConstants.Notifications;

public class Notification : BaseEntity
{
    [Required]
    public int UserId { get; set; }

    [Required]
    public NotificationType NotificationType { get; set; }

    [Required]
    [MaxLength(MessageMaxLength)]
    public string Message { get; set; } = string.Empty;

    [Required]
    public DateTime CreatedAt { get; set; }

    public bool IsRead { get; set; } //IsSeen / IsRead / IsUnread 

    public bool IsDeleted { get; set; }
}
