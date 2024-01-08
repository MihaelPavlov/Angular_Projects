namespace TRINV.Domain.Validations;

using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;

public static class Ensure
{
    public static void IsArgumentNull(string? value,
        [CallerArgumentExpression("value")] string? paramName = null)
    {
        if (value == null)
        {
            throw new ArgumentException("The argument value can't be null", paramName);
        }
    }

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
            throw new ArgumentException("The argument value can't be null or empty", paramName);
        }
    }

    public static void IsNull(object? value,
        [CallerArgumentExpression("value")] string? paramName = null)
    {
        if (value is null)
        {
            throw new ArgumentException("Object value can't be null or empty", paramName);
        }
    }

    public static void IsEqual<T>(T? value1, T? value2)
    {
        var value1Type = value1.GetType();
        var value2Type = value2.GetType();
        var propertyInfo1 = value1Type.GetProperties();
        var propertyInfo2 = value2Type.GetProperties();
        for (int i = 0; i < propertyInfo1.Length; i++)
        {
            var propName1 = propertyInfo1[i].Name;
            var propName2 = propertyInfo2[i].Name;
            var propValue1 = propertyInfo1[i].GetValue(value1);
            var propValue2 = propertyInfo2[i].GetValue(value2);

            if (!propName1.Equals(propName2) || !propValue1.Equals(propValue2))
            {
                throw new ArgumentException("The objects are not equal");
            }
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
