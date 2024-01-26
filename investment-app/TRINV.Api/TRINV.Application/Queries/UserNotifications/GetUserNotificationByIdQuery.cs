namespace TRINV.Application.Queries.UserNotifications;

using Domain.Entities;
using Interfaces;
using Mapster;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;

public record GetUserNotificationIdQuery(int NotificationId) : IRequest<OperationResult<GetUserNotificationByIdQueryModel>>;

internal class GetUserNotificationIdQueryHandler : IRequestHandler<GetUserNotificationIdQuery, OperationResult<GetUserNotificationByIdQueryModel>>
{
    readonly IRepository<UserNotification> _userNotificationRepository;
    readonly IUserContext _userContext;

    public GetUserNotificationIdQueryHandler(IRepository<UserNotification> userNotificationRepository, IUserContext userContext)
    {
        _userNotificationRepository = userNotificationRepository;
        _userContext = userContext;
    }

    public async Task<OperationResult<GetUserNotificationByIdQueryModel>> Handle(GetUserNotificationIdQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<GetUserNotificationByIdQueryModel>();

        var userNotification = await _userNotificationRepository
            .GetByIdAsync(request.NotificationId, cancellationToken);

        if (userNotification == null || userNotification.UserId != _userContext.UserId || userNotification.IsDeleted)
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException("User notification with provided Id was not found!"));

        operationResult.RelatedObject = userNotification.Adapt<GetUserNotificationByIdQueryModel>();

        return operationResult;
    }
}

public record GetUserNotificationByIdQueryModel(
    int Id,
    int UserId,
    string Message,
    int NotificationType,
    DateTime ReceivedDate,
    string NotificationUrl,
    bool IsSeen);