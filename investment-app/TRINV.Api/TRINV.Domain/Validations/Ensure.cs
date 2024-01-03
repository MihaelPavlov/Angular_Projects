namespace TRINV.Domain.Validations;

using System.Runtime.CompilerServices;

public static class Ensure
{
    public static void IsArgumentNull(string? value,
        [CallerArgumentExpression("value")] string? paramName = null)
    {
        if (value == null)
        {
            throw new ArgumentException("The value can't be null", paramName);
        }
    }

    public static void IsArgumentNullOrEmpty(string? value,
            [CallerArgumentExpression("value")] string? paramName = null)
    {
        if (!string.IsNullOrEmpty(value))
        {
            throw new ArgumentException("The value can't be null or empty", paramName);
        }
    }

}
