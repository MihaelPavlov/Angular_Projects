using MediatR;
using TRINV.Shared.Business.Extension;
using TRINV.Shared.Business.Logger;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Application.Queries;

public record ExampleQuery : IRequest<OperationResult<ExampleObject>>;

internal class ExampleQueryHandler : IRequestHandler<ExampleQuery, OperationResult<ExampleObject>>
{
    readonly ILoggerService _loggerService;
    public ExampleQueryHandler(ILoggerService loggerService)
    {
        this._loggerService = loggerService;
    }
    public async Task<OperationResult<ExampleObject>> Handle(ExampleQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<ExampleObject>();

        // Do some validation for example
        // Ops error occure
        // How we adding errors to the operation result.

        // One way to add error
        //if (true != false)
        //{
        //    return operationResult.ReturnWithErrorMessage(new BadRequestException("Custom Bad Request Message"));
        //}

        // Second way to add error
        //Append error Message with error status code 
        operationResult.AppendValidationError(errorMessage: "Email is invalid !", propertyName: "Email");
        operationResult.AppendValidationError(errorMessage: "Email is required !", propertyName: "Email");
        this._loggerService.Log(LogEventLevel.Information, "infosdad sad asd sadasd");
        this._loggerService.Log(LogEventLevel.Error, "ERROR dsa dasds");
        this._loggerService.Log(LogEventLevel.Fatal, "FATAL: Dsa das");
        return operationResult.ReturnWithErrorMessage();
        // do some bussness logic operations ............... more code more code

        var obj = new ExampleObject("ExampleName", "pass", "test", 32131);

        operationResult.RelatedObject = obj;

        return operationResult;
    }
}

public record ExampleObject(string Name, string Passowrd, string Field, int Something);
