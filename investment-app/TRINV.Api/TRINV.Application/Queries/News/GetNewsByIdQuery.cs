namespace TRINV.Application.Queries.News;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;

public record GetNewsByIdQuery(int Id) : IRequest<News>;

public class GetNewsByIdQueryHandler : IRequestHandler<GetNewsByIdQuery, News>
{
    readonly IRepository<News> _repository;

    public GetNewsByIdQueryHandler(IRepository<News> repository)
    {
        _repository = repository;
    }

    public async Task<News> Handle(GetNewsByIdQuery request, CancellationToken cancellationToken)
    {
        var result = await _repository.GetByIdAsync(request.Id, cancellationToken);
        if (result is null)
        {
            throw new NotFoundException(nameof(News), request.Id);
        }

        return result;
    }
}