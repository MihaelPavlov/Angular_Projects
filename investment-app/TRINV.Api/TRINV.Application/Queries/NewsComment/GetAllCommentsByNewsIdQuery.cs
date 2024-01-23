namespace TRINV.Application.Queries.NewsComment;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;

public record GetAllCommentsByNewsIdQuery(int NewsId) : IRequest<OperationResult<IEnumerable<NewsComment>>>;

internal class GetAllCommentsByNewsIdHandler : IRequestHandler<GetAllCommentsByNewsIdQuery, OperationResult<IEnumerable<NewsComment>>>
{
    readonly IRepository<NewsComment> _repository;

    public GetAllCommentsByNewsIdHandler(IRepository<NewsComment> repository)
    {
        _repository = repository;
    }

    public async Task<OperationResult<IEnumerable<NewsComment>>> Handle(GetAllCommentsByNewsIdQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<IEnumerable<NewsComment>>();

        var newsComments = await _repository
            .GetAllWithPredicateAsync(x => x.NewsId == request.NewsId, cancellationToken);

        if (!newsComments.Any())
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException("No comments have been made for this news yet!"));

        operationResult.RelatedObject = newsComments;

        return operationResult;
    }
}