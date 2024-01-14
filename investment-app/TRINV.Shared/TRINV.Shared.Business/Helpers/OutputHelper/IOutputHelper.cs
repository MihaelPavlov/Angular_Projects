using System.Drawing;

namespace TRINV.Shared.Business.Helpers.OutputHelper;

/// <summary>
///  Represents a class which can be used to provide test output.
/// </summary>
public interface IOutputHelper
{
    /// <summary>
    /// Adds a line of text to the output.
    /// </summary>
    /// <param name="message">The message.</param>
    void WriteLine(string message, ConsoleColor color = ConsoleColor.White);
}
