namespace TRINV.Application.Commands.NewsComment;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Utilities;
using System.ComponentModel.DataAnnotations;
using Shared.Business.Exceptions;
using Shared.Business.Extension;

public record CreateNewsCommentCommand : IRequest<OperationResult>
{
    [Required]
    public int NewsId { get; set; }

    [Required]
    [MaxLength(255)]
    public string Comment { get; set; } = string.Empty;
}

internal class CreateNewsCommentCommandHandler : IRequestHandler<CreateNewsCommentCommand, OperationResult>
{
    readonly IUnitOfWork _unitOfWork;
    readonly IRepository<NewsComment> _newsCommentRepository;
    readonly IRepository<News> _newsRepository;
    readonly IUserContext _userContext;

    public CreateNewsCommentCommandHandler(IUnitOfWork unitOfWork, 
        IUserContext userContext, 
        IRepository<NewsComment> newsCommentRepository, IRepository<News> newsRepository)
    {
        _unitOfWork = unitOfWork;
        _userContext = userContext;
        _newsCommentRepository = newsCommentRepository;
        _newsRepository = newsRepository;
    }

    public async Task<OperationResult> Handle(CreateNewsCommentCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult();

        var news = await _newsRepository.GetByIdAsync(request.NewsId, cancellationToken);

        if (news == null)
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException($"{typeof(News)} with Id: {request.NewsId} was not found!"));

        var newComment = new NewsComment
        {
            NewsId = request.NewsId,
            CreatedBy = _userContext.UserId,
            Comment = request.Comment,
            CreatedOn = DateTime.Now
        };

        await _newsCommentRepository.AddAsync(newComment, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return operationResult;
    }
}