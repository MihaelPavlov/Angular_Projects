using System;
using System.Text.Json.Serialization;
using TRINV.Shared.Business.Exceptions;

namespace TRINV.Shared.Business.Utilities;

/// <summary>
/// A Class for a system operation result, with a generic TKey.
/// </summary>
[Serializable]
public class OperationResult
{
    private readonly List<Exception> _errors = new List<Exception>();

    public bool Success { get; set; } = true;

    public List<Exception> Errors => this._errors;

    /// <summary>
    /// Gets or sets the first exception that resulted from the operation.
    /// </summary>
    public string? InitialException { get; set; }

    ///// <summary>
    ///// Gets an <see cref="ILoggerService"/> that can be used to log errors internally.
    ///// </summary>
    //protected ILogger Logger { get; }

    /// <summary>
    /// Appends an error message to the error message collection. A call to this method will set the Success property to false.
    /// To log the error with a specific log level, use <see cref="AppendErrorMessage(string, LogEventLevel?, int)"/>.
    /// </summary>
    /// <param name="message">The error message to append.</param>
    /// <param name="errorCode">The error code.</param>
    public void AppendErrorMessage(string message, string field = "", int errorCode = 0)
    {
        this.Success = false;
        this.InitialException ??= message;

        if (errorCode == 422)
        {
            this._errors.Add(new ValidationErrorsException(field, message));
        }
        else
        {
            this._errors.Add(new Exception(message));
        }
    }

    //TODO: FIX this method handle different case of exception
    public OperationErrorObject GetResult()
    {
        var operationObject = new OperationErrorObject();

        if (this.Errors.Count != 0)
            operationObject.InitialErrorMessage = this.Errors[0].Message;

        var list = new List<ValidatiobObject>();
        for (int i = 0; i < this.Errors.Count; i++)
        {
            ValidationErrorsException errors = new ValidationErrorsException();
            try
            {
                errors = (ValidationErrorsException)this.Errors[i];

            }
            catch (Exception)
            {

            }
            foreach (var error in errors.Errors)
            {
                foreach (var errorMessage in errors.Errors[error.Key])
                    list.Add(new ValidatiobObject { Field = error.Key, Message = errorMessage });
            }
        }

        operationObject.Errors = list.ToArray();
        return operationObject;
    }

}

/// <summary>
/// Represents a generic system operation.
/// </summary>
public class OperationResult<T> : OperationResult
{
    public OperationResult()
    {
    }

    public OperationResult(T resultObject)
    {
        this.RelatedObject = resultObject;
    }

    /// <summary>
    /// Gets or sets the related object of the operation.
    /// </summary>
    public T? RelatedObject { get; set; }

    public OperationErrorObject OperationErrorObject => this.GetResult();
}

public class OperationErrorObject
{
    [JsonPropertyName("initialErrorMessage")]
    public string InitialErrorMessage { get; set; } = string.Empty;

    [JsonPropertyName("errors")]
    public ValidatiobObject[] Errors { get; set; } = Array.Empty<ValidatiobObject>();

    [JsonPropertyName("isSuccess")]
    public bool IsSuccess { get; set; }
}

[Serializable]
public class ValidatiobObject
{
    [JsonPropertyName("field")]
    public string Field { get; set; } = string.Empty;
    [JsonPropertyName("message")]
    public string Message { get; set; } = string.Empty;
}
