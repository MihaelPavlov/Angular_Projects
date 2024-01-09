using Microsoft.AspNetCore.Mvc;
using System;
using System.Text.Json.Serialization;
using TRINV.Shared.Business.Exceptions;
using TRINV.Shared.Business.Exceptions.Interfaces;
using static TRINV.Shared.Business.Exceptions.ValidationErrorsException;

namespace TRINV.Shared.Business.Utilities;

/// <summary>
/// A Class for a system operation result, with a generic TKey.
/// </summary>
[Serializable]
public class OperationResult
{
    private readonly List<Exception> _validationErrors = new List<Exception>();

    public bool Success { get; set; } = true;


    public List<Exception> ValidationErrors = new List<Exception>();

    /// <summary>
    /// Gets or sets the first exception that resulted from the operation.
    /// </summary>
    public string? InitialException { get; set; }

    ///// <summary>
    ///// Gets an <see cref="ILoggerService"/> that can be used to log errors internally.
    ///// </summary>
    //protected ILogger Logger { get; }


    public void AppendValidationError(string errorMessage, string propertyName = "")
    {
        this.Success = false;

        this.ValidationErrors.Add(new ValidationErrorsException(propertyName, errorMessage));
    }

    /// <summary>
    /// Use this method when you want to return the OperationErrorObject, basically completing the operation.
    /// </summary>
    /// <returns></returns>
    public OperationErrorObject CompleteOperation()
    {
        var operationObject = new OperationErrorObject();

        if (this.InitialException != null)
        {
            return operationObject;
        }

        if (this.ValidationErrors.Count != 0)
            operationObject.InitialErrorMessage = this.ValidationErrors[0].Message;

        var list = new List<ValidationError>();
        for (int i = 0; i < this.ValidationErrors.Count; i++)
        {
            ValidationErrorsException errors = (ValidationErrorsException)this.ValidationErrors[i];

            foreach (var error in errors.Errors)
            {
                foreach (var errorMessage in errors.Errors[error.Key])
                    list.Add(new ValidationError(error.Key, errorMessage));
            }
        }

        operationObject.ValidationErrors = list.ToArray();
        return operationObject;
    }

    /// <summary>
    /// Use this method in the case when we want to stop the request flow.
    /// </summary>
    /// <param name="error"></param>
    /// <returns></returns>
    public OperationErrorObject ReturnWithErrorMessage(IError error)
    {
        this.Success = false;

        this.InitialException = error.Message;

        return new OperationErrorObject { InitialErrorMessage = this.InitialException, IsSuccess = false };
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

    /// <summary>
    /// Gets OperationErrorObject which is representing the errors
    /// </summary>
    public OperationErrorObject OperationErrorObject => this.CompleteOperation();

    /// <summary>
    /// Method which is return the current instance of the OperationResult<T>.
    /// And it's give us option to pass a initial exception.
    /// </summary>
    /// <param name="error">Optional error which is initializing the InitialException in the current instance.</param>
    /// <returns></returns>
    public new OperationResult<T> ReturnWithErrorMessage(IError? error = null)
    {
        if (error != null)
            this.InitialException = error.Message;

        return this;
    }
}

public class OperationErrorObject
{
    [JsonPropertyName("initialErrorMessage")]
    public string InitialErrorMessage { get; set; } = string.Empty;

    [JsonPropertyName("validationErrors")]
    public ValidationError[] ValidationErrors { get; set; } = Array.Empty<ValidationError>();

    [JsonPropertyName("isSuccess")]
    public bool IsSuccess { get; set; }
}