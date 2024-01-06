using Microsoft.Extensions.Logging;
using System.Text.Json.Serialization;

namespace TRINV.Shared.Business.Utilities;

/// <summary>
/// A Class for a system operation result, with a generic TKey.
/// </summary>
[Serializable]
public class OperationResult
{
    private readonly List<Exception> _errors = new List<Exception>();

    /// <summary>
    /// Gets or sets a value indicating whether the operation is successful or not.
    /// </summary>
    public bool Success { get; set; } = true;

    /// <summary>
    /// Gets an <see cref="List{T}"/> containing the error codes and messages of the <see cref="OperationResult{T}" />.
    /// </summary>
    public List<Exception> Errors => this._errors;

    /// <summary>
    /// Gets or sets the first exception that resulted from the operation.
    /// </summary>
    public Exception? InitialException { get; set; }

    ///// <summary>
    ///// Gets an <see cref="ILoggerService"/> that can be used to log errors internally.
    ///// </summary>
    //protected ILogger Logger { get; }

    /// <summary>
    /// Appends an exception to the error message collection and logs the full exception as an Error <see cref="LogEventLevel"/> level. A call to this method will set the Success property to false.
    /// </summary>
    /// <param name="exception">The exception to log.</param>
    /// <param name="errorCode">The error code.</param>
    public void AppendException(Exception exception, int errorCode = 0)
    {
        // Append the exception as a first if it is not yet set.
        this.Success = false;
        this.InitialException ??= exception ?? throw new ArgumentNullException(nameof(exception));

        this.AppendErrorMessage(exception.ToString(), errorCode);
    }

    /// <summary>
    /// Appends an error message to the error message collection. A call to this method will set the Success property to false.
    /// To log the error with a specific log level, use <see cref="AppendErrorMessage(string, LogEventLevel?, int)"/>.
    /// </summary>
    /// <param name="message">The error message to append.</param>
    /// <param name="errorCode">The error code.</param>
    public void AppendErrorMessage(string message, int errorCode = 0) => this._errors.Add(new Exception(message));

    public OperationObject GetResult()
    {
        return new OperationObject { Errors = new string[] { this.Errors[0].Message }, IsSuccess = this.Success };
    }
}

public class OperationObject
{
    [JsonPropertyName("errors")]
    public string[] Errors { get; set; } = Array.Empty<string>();
    [JsonPropertyName("isSuccess")]
    public bool IsSuccess { get; set; }
}