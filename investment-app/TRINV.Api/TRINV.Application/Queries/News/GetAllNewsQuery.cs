namespace TRINV.Application.Queries.News;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Extension;
using TRINV.Shared.Business.Exceptions;
using TRINV.Shared.Business.Utilities;

public record GetAllNewsQuery : IRequest<OperationResult<IEnumerable<News>>>;

internal class GetAllNewsQueryHandler : IRequestHandler<GetAllNewsQuery, OperationResult<IEnumerable<News>>>
{
    readonly IRepository<News> _repository;

    public GetAllNewsQueryHandler(IRepository<News> repository)
    {
        _repository = repository;
    }

    public async Task<OperationResult<IEnumerable<News>>> Handle(GetAllNewsQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<IEnumerable<News>>();
        var result = await _repository.GetAllAsync(cancellationToken);

        if (result is null)
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException($"No News was found in database!"));

        operationResult.RelatedObject = result;

        return operationResult;
    }
}
