using MediatR;
using TRINV.Shared.Business.Exceptions;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Application.Queries;

public record ExampleQuery : IRequest<OperationResult<ExampleObject>>;

internal class ExampleQueryHandler : IRequestHandler<ExampleQuery, OperationResult<ExampleObject>>
{
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
        return operationResult.ReturnWithErrorMessage();
        // do some bussness logic operations ............... more code more code

        var obj = new ExampleObject("ExampleName", "pass", "test", 32131);

        operationResult.RelatedObject = obj;

        return operationResult;
    }
}

public record ExampleObject(string Name, string Passowrd, string Field, int Something);
