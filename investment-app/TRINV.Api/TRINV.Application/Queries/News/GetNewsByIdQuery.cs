namespace TRINV.Application.Queries.News;

using Domain.Entities;
using Interfaces;
using Mapster;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;
using TRINV.Shared.Business.Extension;

public record GetNewsByIdQuery(int Id) : IRequest<OperationResult<GetNewsByIdQueryModel>>;

public class GetNewsByIdQueryHandler : IRequestHandler<GetNewsByIdQuery, OperationResult<GetNewsByIdQueryModel>>
{
    readonly IRepository<News> _repository;

    public GetNewsByIdQueryHandler(IRepository<News> repository)
    {
        _repository = repository;
    }

    public async Task<OperationResult<GetNewsByIdQueryModel>> Handle(GetNewsByIdQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<GetNewsByIdQueryModel>();

        var result = await _repository.GetByIdAsync(request.Id, cancellationToken);

        if (result is null)
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException($"{nameof(News)} with Id {request.Id} was not found."));

        operationResult.RelatedObject = result.Adapt<GetNewsByIdQueryModel>();

        return operationResult;
    }
}

public record GetNewsByIdQueryModel(
    int Id,
    string Name,
    string Description,
    string ShortDescription,
    int TimeToRead,
    int Views,
    int UpVote,
    int DownVote,
    string ImageUrl);

