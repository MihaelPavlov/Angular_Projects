using System.Text.Json.Serialization;

namespace TRINV.Shared.Business.Exceptions.Interfaces;

/// <summary>
/// An class defining the structure of a component responsible for the representation of an unexpected behavior in our software.
/// </summary>
public class IError
{
    public IError(string type, int code, string message)
    {
        Type = type;
        Code = code;
        Message = message;
    }

    /// <summary>
    /// Gets the type of the error.
    /// </summary>
    [JsonPropertyName("type")]
    public string Type { get; set; }

    /// <summary>
    /// Error code
    /// </summary>
    [JsonPropertyName("code")]
    public int Code { get; set; }

    /// <summary>
    /// Use this to retrieve a message.
    /// </summary>
    [JsonPropertyName("message")]
    public string Message { get; set; }
}
