namespace TRINV.Application.Commands.News;

using MediatR;
using System.ComponentModel.DataAnnotations;
using Domain.Entities;
using Interfaces;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;
using static Domain.Validations.EntityValidationConstants.News;

public record UpdateNewsCommand : IRequest<OperationResult<News>>
{
    [Required]
    public int Id { get; set; }

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

internal class UpdateNewsCommandHandler : IRequestHandler<UpdateNewsCommand, OperationResult<News>>
{
    readonly IRepository<News> _repository;
    readonly IUnitOfWork _unitOfWork;

    public UpdateNewsCommandHandler(IRepository<News> repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<OperationResult<News>> Handle(UpdateNewsCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<News>();

        var newsToUpdate = await _repository.GetByIdAsync(request.Id, cancellationToken);

        if (newsToUpdate is null)
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException($"{nameof(News)} with Id {request.Id} was not found."));

        newsToUpdate.Name = request.Name;
        newsToUpdate.Description = request.Description;
        newsToUpdate.ImageUrl = request.ImageUrl;

        operationResult.RelatedObject = newsToUpdate;

        _repository.Update(newsToUpdate);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return operationResult;
    }
}
