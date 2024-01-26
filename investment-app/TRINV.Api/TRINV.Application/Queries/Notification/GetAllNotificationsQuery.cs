namespace TRINV.Application.Queries.Notification;

using Domain.Entities;
using Interfaces;
using Mapster;
using MediatR;
using Shared.Business.Utilities;

public record GetAllNotificationsQuery : IRequest<OperationResult<IEnumerable<GetAllNotificationsQueryModel>>>;

internal class GetAllNotificationsQueryHandler : IRequestHandler<GetAllNotificationsQuery, OperationResult<IEnumerable<GetAllNotificationsQueryModel>>>
{
    readonly IRepository<Notification> _repository;

    public GetAllNotificationsQueryHandler(IRepository<Notification> repository)
    {
        _repository = repository;
    }

    public async Task<OperationResult<IEnumerable<GetAllNotificationsQueryModel>>> Handle(GetAllNotificationsQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<IEnumerable<GetAllNotificationsQueryModel>>();

        var notifications = await _repository.GetAllAsync(cancellationToken);

        operationResult.RelatedObject = notifications.Adapt<IEnumerable<GetAllNotificationsQueryModel>>();

        return operationResult;
    }
}

public record GetAllNotificationsQueryModel(
    int Id,
    int NotificationType,
    string Message);