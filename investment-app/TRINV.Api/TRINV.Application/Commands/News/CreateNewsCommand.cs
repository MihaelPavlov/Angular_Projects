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
    public int ViewsCount { get; set; }

    [Required]
    public int UpVote { get; set; }

    [Required]
    public int DownVote { get; set; }

    [Required]
    [MaxLength(ImageUrlMaxLength)]
    public string ImageUrl { get; set; } = null!;
}

public class CreateNewsCommandHandler : IRequestHandler<CreateNewsCommand>
{
    readonly IRepository<News> _repository;

    public CreateNewsCommandHandler(IRepository<News> repository)
    {
        _repository = repository;
    }

    public Task Handle(CreateNewsCommand request, CancellationToken cancellationToken)
    {
        // TODO: Implement CreateNewsCommandHandler
        return Task.FromResult(Unit.Value);
    }
}