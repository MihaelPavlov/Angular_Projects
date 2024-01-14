namespace TRINV.Shared.Business.Helpers.OutputHelper;

/// <summary>
/// Custom implementation of <see cref="IOutputHelper"/>.
/// </summary>
public class OutpuHelper : IOutputHelper
{
    /// <inheritdoc />
    public void WriteLine(string message,ConsoleColor color = ConsoleColor.White)
    {
        Console.ForegroundColor = color;
        Console.WriteLine(message);
        Console.ForegroundColor = ConsoleColor.White;
    }
}
