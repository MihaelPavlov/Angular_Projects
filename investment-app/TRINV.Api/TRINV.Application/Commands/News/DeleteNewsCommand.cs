namespace TRINV.Application.Commands.News;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;
using TRINV.Shared.Business.Extension;

public record DeleteNewsCommand(int Id) : IRequest<OperationResult>;

internal class DeleteNewsCommandHandler : IRequestHandler<DeleteNewsCommand, OperationResult>
{
    readonly IRepository<News> _repository;
    readonly IUnitOfWork _unitOfWork;

    public DeleteNewsCommandHandler(IRepository<News> repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<OperationResult> Handle(DeleteNewsCommand request, CancellationToken cancellationToken)
    {
        var newsToDelete = await _repository.GetByIdAsync(request.Id, cancellationToken);

        if (newsToDelete is null)
            return new OperationResult().ReturnWithErrorMessage(
                new NotFoundException($"{nameof(News)} with Id {request.Id} was not found."));

        _repository.Delete(newsToDelete);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return new OperationResult();
    }
}
