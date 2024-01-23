namespace TRINV.Application.Queries.NewsComment;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;

public record GetNewsCommentByIdQuery(int Id) : IRequest<OperationResult<NewsComment>>;

internal class GetNewsCommentByIdQueryHandler : IRequestHandler<GetNewsCommentByIdQuery, OperationResult<NewsComment>>
{
    readonly IRepository<NewsComment> _repository;

    public GetNewsCommentByIdQueryHandler(IRepository<NewsComment> repository)
    {
        _repository = repository;
    }

    public async Task<OperationResult<NewsComment>> Handle(GetNewsCommentByIdQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<NewsComment>();

        var newsComment = await _repository.GetByIdAsync(request.Id, cancellationToken);

        if (newsComment == null)
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException("Comment with provided Id was not found!"));

        operationResult.RelatedObject = newsComment;

        return operationResult;
    }
}