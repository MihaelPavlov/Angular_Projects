namespace TRINV.Application.Queries.UserNotifications;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;

public record GetUserNotificationIdQuery(int NotificationId) : IRequest<OperationResult<UserNotification>>;

internal class GetUserNotificationIdQueryHandler : IRequestHandler<GetUserNotificationIdQuery, OperationResult<UserNotification>>
{
    readonly IRepository<UserNotification> _userNotificationRepository;
    readonly IUserContext _userContext;

    public GetUserNotificationIdQueryHandler(IRepository<UserNotification> userNotificationRepository, IUserContext userContext)
    {
        _userNotificationRepository = userNotificationRepository;
        _userContext = userContext;
    }

    public async Task<OperationResult<UserNotification>> Handle(GetUserNotificationIdQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<UserNotification>();

        var userNotification = await _userNotificationRepository
            .GetByIdAsync(request.NotificationId, cancellationToken);

        if (userNotification == null)
            return operationResult.ReturnWithErrorMessage(new NotFoundException(
                $"User notification with provided Id was not found!"));

        operationResult.RelatedObject = userNotification;

        return operationResult;
    }
}