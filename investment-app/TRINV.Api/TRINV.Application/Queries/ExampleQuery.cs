using MediatR;
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
        operationResult.AppendErrorMessage(" Example is invalid !");

        // Second way to add error
        //Append error Message with error status code 
        operationResult.AppendErrorMessage(message: " Email is invalid !", field: "Email", errorCode: ErrorCode.ValidationError);

        // do some bussness logic operations ............... more code more code

        var obj = new ExampleObject("ExampleName", "pass", "test", 32131);

        operationResult.RelatedObject = obj;

        return operationResult;
    }
}

public record ExampleObject(string Name, string Passowrd, string Field, int Something);
