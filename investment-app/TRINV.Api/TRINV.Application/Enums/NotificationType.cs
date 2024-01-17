namespace TRINV.Application.Enums;

using Shared.Business.Helpers;

public class NotificationType : EnumerationHelper
{
    public static readonly NotificationType Email = new NotificationType(0, "Email");
    public static readonly NotificationType Alert = new NotificationType(1, "Alert");
    public static readonly NotificationType System = new NotificationType(2, "System");

    public NotificationType(int id, string name) 
        : base(id, name) {}

    public static string GetMessageById(int id)
        => id switch
        {
            0 => "Default Email Notification",
            1 => "Default Alert Message",
            2 => "Default System Message",
            _ => throw new ArgumentNullException("Unexisting notification type!")
        };

    public static bool ExistById(int id)
        => id switch
        {
            0 => true,
            1 => true,
            2 => true,
            _ => false
        };
}