namespace TRINV.Application.Queries.News;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Utilities;

public record GetNewsByIdQuery(int Id) : IRequest<OperationResult<News>>;

public class GetNewsByIdQueryHandler : IRequestHandler<GetNewsByIdQuery, OperationResult<News>>
{
    readonly IRepository<News> _repository;

    public GetNewsByIdQueryHandler(IRepository<News> repository)
    {
        _repository = repository;
    }

    public async Task<OperationResult<News>> Handle(GetNewsByIdQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<News>();
        var result = await _repository.GetByIdAsync(request.Id, cancellationToken);
        if (result is null) operationResult.AppendValidationError("News with provided Id was not found");
        
        operationResult.RelatedObject = result;

        return operationResult;
    }
}