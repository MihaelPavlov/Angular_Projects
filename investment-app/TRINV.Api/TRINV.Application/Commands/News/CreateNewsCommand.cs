namespace TRINV.Application.Commands.News;

using MediatR;
using System.ComponentModel.DataAnnotations;
using Domain.Entities;
using Interfaces;
using static Domain.Validations.EntityValidationConstants.News;

public record CreateNewsCommand : IRequest
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

public class CreateNewsCommandHandler : IRequestHandler<CreateNewsCommand>
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

    public async Task Handle(CreateNewsCommand request, CancellationToken cancellationToken)
    {
        var news = new News
        {
            UserId = _userContext.UserId,
            Name = request.Name,
            Description = request.Description,
            ImageUrl = request.ImageUrl
        };

        await _repository.Insert(news, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }
}

public record CreateNewsModel(int UserId, string Name, string Description, string ImageUrl);