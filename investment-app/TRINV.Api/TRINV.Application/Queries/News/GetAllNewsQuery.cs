namespace TRINV.Application.Queries.News;

using Domain.Entities;
using Interfaces;
using MediatR;

public record GetAllNewsQuery : IRequest<IEnumerable<News>>;

internal class GetAllNewsQueryHandler : IRequestHandler<GetAllNewsQuery, IEnumerable<News>>
{
    readonly IRepository<News> _repository;

    public GetAllNewsQueryHandler(IRepository<News> repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<News>> Handle(GetAllNewsQuery request, CancellationToken cancellationToken)
    {
        var result = await _repository.GetAllAsync(cancellationToken);

        return result;
    }
}
