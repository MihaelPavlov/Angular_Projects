namespace TRINV.Application.Commands.NewsComment;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;

public record DeleteNewsCommentCommand(int Id) : IRequest<OperationResult>;

internal class DeleteNewsCommentCommandHandler : IRequestHandler<DeleteNewsCommentCommand, OperationResult>
{
    readonly IRepository<NewsComment> _newsCommentRepository;
    readonly IUnitOfWork _unitOfWork;

    public DeleteNewsCommentCommandHandler(
        IUnitOfWork unitOfWork,
        IRepository<NewsComment> newsCommentRepository)
    {
        _unitOfWork = unitOfWork;
        _newsCommentRepository = newsCommentRepository;
    }

    public async Task<OperationResult> Handle(DeleteNewsCommentCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult();

        var newsComment = await _newsCommentRepository.GetByIdAsync(request.Id, cancellationToken);

        if (newsComment == null)
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException($"{typeof(NewsComment)} with Id: {request.Id} was not found!"));

        _newsCommentRepository.Delete(newsComment);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return operationResult;
    }
}