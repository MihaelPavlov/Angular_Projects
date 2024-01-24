namespace TRINV.Application.Queries.NewsComment;

using Domain.Entities;
using Interfaces;
using Mapster;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;

public record GetNewsCommentByIdQuery(int Id) : IRequest<OperationResult<GetNewsCommentByIdQueryModel>>;

internal class GetNewsCommentByIdQueryHandler : IRequestHandler<GetNewsCommentByIdQuery, OperationResult<GetNewsCommentByIdQueryModel>>
{
    readonly IRepository<NewsComment> _repository;

    public GetNewsCommentByIdQueryHandler(IRepository<NewsComment> repository)
    {
        _repository = repository;
    }

    public async Task<OperationResult<GetNewsCommentByIdQueryModel>> Handle(GetNewsCommentByIdQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<GetNewsCommentByIdQueryModel>();

        var newsComment = await _repository.GetByIdAsync(request.Id, cancellationToken);

        if (newsComment == null)
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException($"{typeof(NewsComment)} with provided Id: {request.Id} was not found!"));

        operationResult.RelatedObject = newsComment.Adapt<GetNewsCommentByIdQueryModel>();

        return operationResult;
    }
}

public record GetNewsCommentByIdQueryModel(
    int Id,
    int NewsId,
    int UserId,
    string Comment,
    int UpVotes,
    int DownVotes,
    DateTime CreatedOn,
    DateTime? UpdatedOn
);