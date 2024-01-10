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
    public int UserId { get; set; }

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

public class CreateNewsCommandHandler : IRequestHandler<CreateNewsCommand, OperationResult<News>>
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
        
        var isNameNullOrEmpty = Ensure.IsArgumentNullOrEmpty(request.Name);
        var isNameNullOrWhiteSpace = Ensure.IsArgumentNullOrWhiteSpace(request.Name);

        if (isNameNullOrEmpty) operationResult.AppendValidationError("Name cannot be null or empty.");
        if (isNameNullOrWhiteSpace) operationResult.AppendValidationError("Name cannot be null or whitespace.");

        var isDescriptionNullOrEmpty = Ensure.IsArgumentNullOrEmpty(request.Description);
        var isDescriptionNullOrWhiteSpace = Ensure.IsArgumentNullOrWhiteSpace(request.Description);

        if (isDescriptionNullOrEmpty) operationResult.AppendValidationError("Description cannot be null or empty.");
        if (isDescriptionNullOrWhiteSpace) operationResult.AppendValidationError("Description cannot be null or whitespace.");

        var isImageUrlNullOrEmpty = Ensure.IsArgumentNullOrEmpty(request.ImageUrl);
        var isImageUrlNullOrWhiteSpace = Ensure.IsArgumentNullOrWhiteSpace(request.ImageUrl);

        if (isImageUrlNullOrEmpty) operationResult.AppendValidationError("ImageUrl cannot be null or empty.");
        if (isImageUrlNullOrWhiteSpace) operationResult.AppendValidationError("ImageUrl cannot be null or whitespace.");

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