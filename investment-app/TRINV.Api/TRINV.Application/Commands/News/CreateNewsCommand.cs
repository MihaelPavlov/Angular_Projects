namespace TRINV.Application.Commands.News;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Utilities;
using System.ComponentModel.DataAnnotations;

public record CreateNewsCommand : IRequest<OperationResult>
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = null!;

    [Required]
    public string Description { get; set; } = null!;

    [Required]
    [MaxLength(200)]
    public string ShortDescription { get; set; } = null!;

    [Required]
    public string ImageUrl { get; set; } = null!;

    [Required]
    public int TimeToRead { get; set; }
}

internal class CreateNewsCommandHandler : IRequestHandler<CreateNewsCommand, OperationResult>
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

    public async Task<OperationResult> Handle(CreateNewsCommand request, CancellationToken cancellationToken)
    {
        var news = new News
        {
            UserId = _userContext.UserId,
            Name = request.Name,
            Description = request.Description,
            ShortDescription = request.ShortDescription,
            ImageUrl = request.ImageUrl,
            TimeToRead = request.TimeToRead
        };

        await _repository.AddAsync(news, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return new OperationResult();
    }
}

public record CreateNewsModel(int UserId, string Name, string Description, string ImageUrl);
