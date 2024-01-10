namespace TRINV.Shared.Business.Exceptions.Interfaces;

/// <summary>
/// An interface defining the structure of a component responsible for the representation of an unexpected behavior in our software.
/// </summary>
public interface IError
{
    /// <summary>
    /// Gets the unique key of the error.
    /// </summary>
    int Key { get; }

    /// <summary>
    /// Use this to retrieve a message.
    /// </summary>
    string Message { get; set; }
}
