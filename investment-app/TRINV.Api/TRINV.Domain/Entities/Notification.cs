namespace TRINV.Domain.Entities;

using System.ComponentModel.DataAnnotations;

public class Notification : BaseEntity
{
    [Required]
    public int NotificationType { get; set; }

    [Required]
    [MaxLength(200)]
    public string Message { get; set; } = string.Empty;
}
