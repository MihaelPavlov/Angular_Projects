namespace TRINV.Application.Commands.NewsComment;

using System.ComponentModel.DataAnnotations;
using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;

public record UpdateNewsCommentCommand : IRequest<OperationResult>
{
    [Required]
    public int NewsCommentId { get; set; }

    [Required]
    [MaxLength(200)]
    public string Comment { get; set; } = string.Empty;
}

public class UpdateNewsCommentCommandHandler : IRequestHandler<UpdateNewsCommentCommand, OperationResult>
{
    readonly IUnitOfWork _unitOfWork;
    readonly IRepository<NewsComment> _newsCommentRepository;
    readonly IUserContext _userContext;

    public UpdateNewsCommentCommandHandler(
        IUnitOfWork unitOfWork,
        IRepository<NewsComment> newsCommentRepository, 
        IUserContext userContext)
    {
        _unitOfWork = unitOfWork;
        _newsCommentRepository = newsCommentRepository;
        _userContext = userContext;
    }

    public async Task<OperationResult> Handle(UpdateNewsCommentCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult();

        var newsComment = await _newsCommentRepository.GetByIdAsync(request.NewsCommentId, cancellationToken);

        if (newsComment == null || newsComment.NewsId != _userContext.UserId)
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException("Comment not found"));

        newsComment.Comment = request.Comment;
        newsComment.UpdatedOn = DateTime.Now;

        _newsCommentRepository.Update(newsComment);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return operationResult;
    }
}
