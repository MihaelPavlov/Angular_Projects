namespace TRINV.Application.Commands.News;

using MediatR;
using System.ComponentModel.DataAnnotations;
using Domain.Entities;
using Interfaces;
using static Domain.Validations.EntityValidationConstants.News;

public record UpdateNewsCommand : IRequest
{
    public int Id { get; set; }

    [Required]
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

public class UpdateNewsCommandHandler : IRequestHandler<UpdateNewsCommand>
{
    readonly IRepository<News> _repository;
    readonly IUnitOfWork _unitOfWork;

    public UpdateNewsCommandHandler(IRepository<News> repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public Task Handle(UpdateNewsCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
