namespace TRINV.Application.Queries.Notification;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;

public record GetNotificationByIdQuery(int Id) : IRequest<OperationResult<Notification>>;

internal class
    GetNotificationByIdQueryHandler : IRequestHandler<GetNotificationByIdQuery, OperationResult<Notification>>
{
    private readonly IRepository<Notification> _repository;

    public GetNotificationByIdQueryHandler(IRepository<Notification> repository)
    {
        _repository = repository;
    }

    public async Task<OperationResult<Notification>> Handle(GetNotificationByIdQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<Notification>();

        var notification = await _repository.GetByIdAsync(request.Id, cancellationToken);

        if (notification == null) 
            return operationResult.ReturnWithErrorMessage(new NotFoundException("No notification was found!"));

        operationResult.RelatedObject = notification;

        return operationResult;
    }
}