namespace TRINV.Application.Queries.NewsComment;

using Domain.Entities;
using Interfaces;
using Mapster;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;

public record GetAllCommentsByNewsIdQuery(int NewsId) : IRequest<OperationResult<IEnumerable<GetAllCommentsByNewsIdQueryModel>>>;

internal class GetAllCommentsByNewsIdHandler : IRequestHandler<GetAllCommentsByNewsIdQuery, OperationResult<IEnumerable<GetAllCommentsByNewsIdQueryModel>>>
{
    readonly IRepository<NewsComment> _repository;
    readonly IRepository<News> _newsRepository;

    public GetAllCommentsByNewsIdHandler(IRepository<NewsComment> repository, IRepository<News> newsRepository)
    {
        _repository = repository;
        _newsRepository = newsRepository;
    }

    public async Task<OperationResult<IEnumerable<GetAllCommentsByNewsIdQueryModel>>> Handle(GetAllCommentsByNewsIdQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<IEnumerable<GetAllCommentsByNewsIdQueryModel>>();

        var news = await _newsRepository.GetByIdAsync(request.NewsId, cancellationToken);

        if (news == null)
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException($"{typeof(News)} with provided Id: {request.NewsId} was not found!"));

        var newsComments = await _repository
            .GetAllWithPredicateAsync(x => x.NewsId == request.NewsId, cancellationToken);

        operationResult.RelatedObject = newsComments.Adapt<IEnumerable<GetAllCommentsByNewsIdQueryModel>>();

        return operationResult;
    }
}

public record GetAllCommentsByNewsIdQueryModel(
    int Id,
    int NewsId,
    int CreatedBy,
    string Comment,
    int UpVotes,
    int DownVotes,
    DateTime CreatedOn,
    DateTime? UpdatedOn
    );