namespace TRINV.Application.Commands.News;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Utilities;
using System.ComponentModel.DataAnnotations;
using Domain.Validations;
using static Domain.Validations.EntityValidationConstants.News;

public record CreateNewsCommand : IRequest<OperationResult<News>>
{
    [Required]
    [MaxLength(NameMaxLength)]
    public string Name { get; set; } = null!;

    [Required]
    [MaxLength(DescriptionMaxLength)]
    public string Description { get; set; } = null!;

    [Required]
    [MaxLength(ImageUrlMaxLength)]
    public string ImageUrl { get; set; } = null!;
}

internal class CreateNewsCommandHandler : IRequestHandler<CreateNewsCommand, OperationResult<News>>
{
    readonly IRepository<News> _repository;
    readonly IUnitOfWork _unitOfWork;
    readonly IUserContext _userContext;

    public CreateNewsCommandHandler(IRepository<News> repository, IUnitOfWork unitOfWork, IUserContext userContext)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
        _userContext = userContext;
    }

    public async Task<OperationResult<News>> Handle(CreateNewsCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<News>();

        if (Ensure.IsArgumentNullOrWhiteSpace(request.Name)) 
            operationResult.AppendValidationError("Name cannot be null or whitespace.", nameof(News.Name));

        if (Ensure.IsArgumentNullOrWhiteSpace(request.Description)) 
            operationResult.AppendValidationError("Description cannot be null or whitespace.", nameof(News.Description));

        if (Ensure.IsArgumentNullOrWhiteSpace(request.ImageUrl)) 
            operationResult.AppendValidationError("ImageUrl cannot be null or whitespace.", nameof(News.ImageUrl));

        var news = new News
        {
            UserId = _userContext.UserId,
            Name = request.Name,
            Description = request.Description,
            ImageUrl = request.ImageUrl
        };

        operationResult.RelatedObject = news;

        await _repository.Insert(news, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return operationResult;
    }
}

public record CreateNewsModel(int UserId, string Name, string Description, string ImageUrl);