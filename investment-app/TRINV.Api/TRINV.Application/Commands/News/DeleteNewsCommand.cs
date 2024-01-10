namespace TRINV.Application.Commands.News;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;

public record DeleteNewsCommand(int Id) : IRequest;

internal class DeleteNewsCommandHandler : IRequestHandler<DeleteNewsCommand>
{
    readonly IRepository<News> _repository;
    readonly IUnitOfWork _unitOfWork;

    public DeleteNewsCommandHandler(IRepository<News> repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(DeleteNewsCommand request, CancellationToken cancellationToken)
    {
        var newsToDelete = await _repository.GetByIdAsync(request.Id, cancellationToken);
        if (newsToDelete is null)
        {
            throw new NotFoundException(nameof(News), request.Id);
        }

        _repository.Delete(newsToDelete);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }
}