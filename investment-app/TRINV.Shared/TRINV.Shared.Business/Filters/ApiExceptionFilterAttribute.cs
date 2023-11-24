namespace TRINV.Shared.Business.Filters;

using System;
using System.Collections.Generic;
using Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

public class ApiExceptionFilterAttribute : ExceptionFilterAttribute
{
    readonly ILogger<ApiExceptionFilterAttribute> _logger;
    readonly IDictionary<Type, Action<ExceptionContext>> _exceptionHandlers;

    public ApiExceptionFilterAttribute(ILogger<ApiExceptionFilterAttribute> logger)
    {
        _logger = logger;
        _exceptionHandlers = new Dictionary<Type, Action<ExceptionContext>>
            {
                { typeof(ValidationErrorsException), HandleValidationException },
                { typeof(NotFoundException), HandleNotFoundException },
                { typeof(UnauthorizedAccessException), HandleUnauthorizedAccessException },
                { typeof(ForbiddenAccessException), HandleForbiddenAccessException },
                { typeof(InfrastructureException), HandleInfrastructureException },
                { typeof(BadRequestException), HandleBadRequestException },
            };
    }

    public override void OnException(ExceptionContext context)
    {
        HandleException(context);
        base.OnException(context);
    }

    private void HandleException(ExceptionContext context)
    {
        Type type = context.Exception.GetType();
        if (_exceptionHandlers.ContainsKey(type))
        {
            _exceptionHandlers[type].Invoke(context);
            return;
        }

        if (!context.ModelState.IsValid)
        {
            HandleInvalidModelStateException(context);
            return;
        }

        HandleUnknownException(context);
    }

    private void HandleValidationException(ExceptionContext context)
    {
        var exception = (ValidationErrorsException)context.Exception;
        context.Result = new UnprocessableEntityObjectResult(new ValidationProblemDetails(exception.Errors));
        context.ExceptionHandled = true;
    }

    private static void HandleInvalidModelStateException(ExceptionContext context)
    {
        context.Result = new UnprocessableEntityObjectResult(new ValidationProblemDetails(context.ModelState));
        context.ExceptionHandled = true;
    }

    private void HandleNotFoundException(ExceptionContext context)
    {
        context.Result = new NotFoundObjectResult(new ProblemDetails()
        {
            Title = "The specified resource was not found.",
            Detail = context.Exception.Message
        });
        context.ExceptionHandled = true;
    }

    private void HandleUnauthorizedAccessException(ExceptionContext context)
    {
        var details = new ProblemDetails
        {
            Status = StatusCodes.Status401Unauthorized,
            Title = "Unauthorized"
        };
        context.Result = new ObjectResult(details)
        {
            StatusCode = details.Status
        };
        context.ExceptionHandled = true;
    }

    private void HandleForbiddenAccessException(ExceptionContext context)
    {
        var details = new ProblemDetails
        {
            Status = StatusCodes.Status403Forbidden,
            Title = "Forbidden",
            Detail = context.Exception.Message
        };
        context.Result = new ObjectResult(details)
        {
            StatusCode = details.Status
        };
        context.ExceptionHandled = true;
    }

    private void HandleInfrastructureException(ExceptionContext context)
    {
        var details = new ProblemDetails
        {
            Status = StatusCodes.Status500InternalServerError,
            Title = "An error occurred while processing your request.",
            Detail = context.Exception.Message
        };
        context.Result = new ObjectResult(details)
        {
            StatusCode = details.Status
        };
        context.ExceptionHandled = true;
    }

    private void HandleBadRequestException(ExceptionContext context)
    {
        context.Result = new BadRequestObjectResult(new ProblemDetails
        {
            Detail = context.Exception.Message
        });
        context.ExceptionHandled = true;
    }

    private void HandleUnknownException(ExceptionContext context)
    {
        _logger.LogError(context.Exception, "Handle Unknown Exception");

        var details = new ProblemDetails
        {
            Status = StatusCodes.Status500InternalServerError,
            Title = "An error occurred while processing your request.",
            Detail = "An unexpected error occurred"
        };
        context.Result = new ObjectResult(details)
        {
            StatusCode = details.Status
        };
        context.ExceptionHandled = true;
    }
}
