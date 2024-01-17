namespace TRINV.Application.Queries.News;

using MediatR;
using TRINV.Application.Interfaces;
using TRINV.Shared.Business.Utilities;
using TRINV.Domain.Entities;
using Mapster;

public record GetAllNewsQuery : IRequest<OperationResult<IEnumerable<GetAllNewsQueryModel>>>;

internal class GetAllNewsQueryHandler : IRequestHandler<GetAllNewsQuery, OperationResult<IEnumerable<GetAllNewsQueryModel>>>
{
    readonly IRepository<News> _repository;

    public GetAllNewsQueryHandler(IRepository<News> repository)
    {
        _repository = repository;
    }

    public async Task<OperationResult<IEnumerable<GetAllNewsQueryModel>>> Handle(GetAllNewsQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<IEnumerable<GetAllNewsQueryModel>>();

        var result = await _repository.GetAllAsync(cancellationToken);

        operationResult.RelatedObject = result.Adapt<IEnumerable<GetAllNewsQueryModel>>();

        return operationResult;
    }
}

public record GetAllNewsQueryModel(
    int Id,
    string Name,
    string Description,
    string ShortDescription,
    int TimeToRead,
    int Views,
    int UpVote,
    int DownVote,
    string ImageUrl);
