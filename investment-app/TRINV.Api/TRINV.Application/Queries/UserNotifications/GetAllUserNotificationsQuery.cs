namespace TRINV.Application.Queries.UserNotifications;

using Domain.Entities;
using Interfaces;
using Mapster;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;

public record GetAllUserNotificationsQuery : IRequest<OperationResult<IEnumerable<GetAllUserNotificationsQueryModel>>>;

internal class GetAllUserNotificationsQueryHandler : IRequestHandler<GetAllUserNotificationsQuery, OperationResult<IEnumerable<GetAllUserNotificationsQueryModel>>>
{
    readonly IRepository<UserNotification> _userNotificationRepository;
    readonly IUserContext _userRepository;

    public GetAllUserNotificationsQueryHandler(IRepository<UserNotification> userNotificationRepository, IUserContext userRepository)
    {
        _userNotificationRepository = userNotificationRepository;
        _userRepository = userRepository;
    }

    public async Task<OperationResult<IEnumerable<GetAllUserNotificationsQueryModel>>> Handle(GetAllUserNotificationsQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<IEnumerable<GetAllUserNotificationsQueryModel>>();

        var userNotifications = await _userNotificationRepository
            .GetAllWithPredicateAsync(x => x.UserId == _userRepository.UserId, cancellationToken);

        if (userNotifications == null)
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException("No notifications were found for the current user!"));

        operationResult.RelatedObject = userNotifications.Adapt<IEnumerable<GetAllUserNotificationsQueryModel>>();

        return operationResult;
    }
}

public record GetAllUserNotificationsQueryModel(
    int Id,
    int UserId,
    string Message,
    int NotificationType,
    DateTime ReceivedDate,
    string NotificationUrl,
    bool IsSeen);