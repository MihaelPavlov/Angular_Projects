namespace TRINV.Application.Commands.News;

using MediatR;
using System.ComponentModel.DataAnnotations;
using Domain.Entities;
using Interfaces;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;
using TRINV.Shared.Business.Extension;

public record UpdateNewsCommand : IRequest<OperationResult>
{
    [Required]
    public int Id { get; set; }

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

internal class UpdateNewsCommandHandler : IRequestHandler<UpdateNewsCommand, OperationResult>
{
    readonly IRepository<News> _repository;
    readonly IUnitOfWork _unitOfWork;

    public UpdateNewsCommandHandler(IRepository<News> repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<OperationResult> Handle(UpdateNewsCommand request, CancellationToken cancellationToken)
    {
        var newsToUpdate = await _repository.GetByIdAsync(request.Id, cancellationToken);

        if (newsToUpdate is null)
            return new OperationResult().ReturnWithErrorMessage(
                new NotFoundException($"{nameof(News)} with Id {request.Id} was not found."));

        newsToUpdate.Name = request.Name;
        newsToUpdate.Description = request.Description;
        newsToUpdate.ImageUrl = request.ImageUrl;
        newsToUpdate.TimeToRead = request.TimeToRead;
        newsToUpdate.ShortDescription = request.ShortDescription;

        _repository.Update(newsToUpdate);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return new OperationResult();
    }
}
