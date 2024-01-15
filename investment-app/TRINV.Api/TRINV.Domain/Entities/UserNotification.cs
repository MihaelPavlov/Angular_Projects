namespace TRINV.Domain.Entities;

using System.ComponentModel.DataAnnotations;

public class UserNotification
{
    //TODO: To add Id
    [Required]
    public int UserId { get; set; }

    //TODO: Replace with notification Message 
    [Required]
    public int NotificationId { get; set; }

    public DateTime ReceivedDate { get; set; }

    public bool IsSeen { get; set; }

    public bool IsDeleted { get; set; }
}