namespace TRINV.Domain.Validations;

public static class EntityValidationConstants
{
    public static class Investment
    {
        public const int NameMaxLength = 50;
    }

    public static class GlobalSetting
    {
        public const int NameMaxLength = 50;
        public const int DescriptionMaxLength = 250;
    }

    public static class News
    {
        public const int NameMaxLength = 50;
        public const int DescriptionMaxLength = 250;
        public const int ImageUrlMaxLength = 2000;
    }

    public static class Notifications
    {
        public const int MessageMaxLength = 500;
    }
}