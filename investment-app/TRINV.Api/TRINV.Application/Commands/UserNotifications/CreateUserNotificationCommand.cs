namespace TRINV.Application.Commands.UserNotifications;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Utilities;

public record CreateUserNotificationCommand(int NotificationId, int UserId) : IRequest<OperationResult<UserNotification>>;

internal class CreateUserNotificationCommandHandler : IRequestHandler<CreateUserNotificationCommand, OperationResult<UserNotification>>
{
    readonly IUnitOfWork _unitOfWork;
    readonly IUserNotificationRepository _userNotificationRepository;
    readonly IRepository<Notification> _notificationRepository;

    public CreateUserNotificationCommandHandler(IUnitOfWork unitOfWork, 
        IUserNotificationRepository userNotificationRepository, 
        IRepository<Notification> notificationRepository)
    {
        _unitOfWork = unitOfWork;
        _userNotificationRepository = userNotificationRepository;
        _notificationRepository = notificationRepository;
    }

    public async Task<OperationResult<UserNotification>> Handle(CreateUserNotificationCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<UserNotification>();

        var notification = await _notificationRepository
            .GetByIdAsync(request.NotificationId, cancellationToken);

        if(notification == null || notification.IsDeleted) 
            return operationResult.ReturnWithErrorMessage(new NotFoundException(
            $"{nameof(Notification)} was not found!"));

        var userNotification = new UserNotification
        {
            NotificationId = request.NotificationId,
            UserId = request.UserId
        };

        await _userNotificationRepository.CreateUserNotificationAsync(userNotification, cancellationToken);

        operationResult.RelatedObject = userNotification;

        return operationResult;
    }
}