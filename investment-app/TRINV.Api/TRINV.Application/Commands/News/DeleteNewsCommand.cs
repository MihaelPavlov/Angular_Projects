namespace TRINV.Application.Commands.News;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Utilities;

public record DeleteNewsCommand(int Id) : IRequest<OperationResult<News>>;

internal class DeleteNewsCommandHandler : IRequestHandler<DeleteNewsCommand, OperationResult<News>>
{
    readonly IRepository<News> _repository;
    readonly IUnitOfWork _unitOfWork;

    public DeleteNewsCommandHandler(IRepository<News> repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<OperationResult<News>> Handle(DeleteNewsCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<News>();

        var newsToDelete = await _repository.GetByIdAsync(request.Id, cancellationToken);

        if (newsToDelete is null) operationResult.AppendValidationError("News with provided Id not found.");

        operationResult.RelatedObject = newsToDelete;

        _repository.Delete(newsToDelete);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return operationResult;
    }
}