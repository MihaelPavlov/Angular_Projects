namespace TRINV.Domain.Validations;

using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;

public static class Ensure
{
    public static void IsArgumentNullOrEmpty(string? value,
        [CallerArgumentExpression("value")] string? paramName = null)
    {
        if (string.IsNullOrEmpty(value))
        {
            throw new ArgumentException("The argument value can't be null or empty", paramName);
        }
    }

    public static void IsArgumentNullOrWhiteSpace(string? value,
        [CallerArgumentExpression("value")] string? paramName = null)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException("The argument value can't be null or white space", paramName);
        }
    }

    public static void IsNull<T>(T? value,
        [CallerArgumentExpression("value")] string? paramName = null)
    {
        if (value is null)
        {
            throw new ArgumentException("Object value can't be null or empty", paramName);
        }
    }

    public static void IsEqual<T>(T? value1, T? value2)
    {
        Type type = typeof(T);
        foreach (var field in type.GetFields())
        {
            var fieldValue1 = field.GetValue(value1);
            var fieldValue2 = field.GetValue(value2);

            if (fieldValue1 == null && fieldValue2 == null) continue;
            if (fieldValue1 == null || !fieldValue1.Equals(fieldValue2))
                throw new ArgumentException("The objects are not equal");
        }
    }

    public static void IsEnumOutOfRange(Enum value, [CallerArgumentExpression("value")] string? paramName = null)
    {
        if (!Enum.IsDefined(typeof(Enum), value))
        {
            throw new ArgumentException("Enum do not exist!", paramName);
        }
    }

    public static void IsValidEmail(string email, 
        [CallerArgumentExpression("email")] string? paramName = null)
    {
        string emailPattern = @"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";
        var match = Regex.IsMatch(email, emailPattern);

        if (!match)
        {
            throw new ArgumentException("The email is not valid", paramName);
        }
    }
}
