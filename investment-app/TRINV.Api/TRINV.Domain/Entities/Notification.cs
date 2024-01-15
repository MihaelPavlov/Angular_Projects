namespace TRINV.Domain.Entities;

using System.ComponentModel.DataAnnotations;
using Enums;
using static Validations.EntityValidationConstants.Notifications;

public class Notification : BaseEntity
{
    [Required]
    public NotificationType NotificationType { get; set; }

    [Required]
    [MaxLength(MessageMaxLength)]
    public string Message { get; set; } = string.Empty;

    [Required]
    public DateTime CreatedOn { get; set; }

    public bool IsDeleted { get; set; }
}
