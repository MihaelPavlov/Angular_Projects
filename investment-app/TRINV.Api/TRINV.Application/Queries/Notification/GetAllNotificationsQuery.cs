namespace TRINV.Application.Queries.Notification;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;

public record GetAllNotificationsQuery : IRequest<OperationResult<List<Notification>>>;

internal class GetAllNotificationsQueryHandler : IRequestHandler<GetAllNotificationsQuery, OperationResult<List<Notification>>>
{
    readonly IRepository<Notification> _repository;

    public GetAllNotificationsQueryHandler(IRepository<Notification> repository)
    {
        _repository = repository;
    }

    public async Task<OperationResult<List<Notification>>> Handle(GetAllNotificationsQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<List<Notification>>();

        var notifications = await _repository.GetAllAsync(cancellationToken);

        if (!notifications.Any())
            return operationResult.ReturnWithErrorMessage(new NotFoundException("No notifications were found!"));

        operationResult.RelatedObject = notifications.ToList();

        return operationResult;
    }
}