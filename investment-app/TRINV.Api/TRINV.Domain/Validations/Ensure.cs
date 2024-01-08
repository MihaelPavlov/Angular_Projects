namespace TRINV.Domain.Validations;

using System.Text.RegularExpressions;

public static class Ensure
{
    public static bool IsArgumentNullOrEmpty(string? value)
    {
        return string.IsNullOrEmpty(value);
    }

    public static bool IsArgumentNullOrWhiteSpace(string? value)
    {
        return string.IsNullOrWhiteSpace(value);
    }

    public static bool IsNull<T>(T? value)
    {
        if (value is null)
        {
            return true;
        }
        return false;
    }

    public static bool IsEqual<T>(T? value1, T? value2)
    {
        Type type = typeof(T);
        foreach (var field in type.GetFields())
        {
            var fieldValue1 = field.GetValue(value1);
            var fieldValue2 = field.GetValue(value2);

            if (fieldValue1 == null && fieldValue2 == null) continue;
            if (fieldValue1 == null || !fieldValue1.Equals(fieldValue2)) return false;
        }
        return true;
    }

    public static bool IsEnumOutOfRange(Enum value)
    {
        return Enum.IsDefined(typeof(Enum), value);
    }

    public static bool IsValidEmail(string email)
    {
        string emailPattern = @"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";
        return Regex.IsMatch(email, emailPattern);
    }
}
