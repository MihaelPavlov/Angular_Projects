namespace TRINV.Application.Commands.UserNotifications;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Utilities;

//TODO: Change to accept notification type
public record CreateUserNotificationCommand(Enum NotificationType, string? Message = null) : IRequest<OperationResult<UserNotification>>;

internal class CreateUserNotificationCommandHandler : IRequestHandler<CreateUserNotificationCommand, OperationResult<UserNotification>>
{
    readonly IUnitOfWork _unitOfWork;
    readonly IUserNotificationRepository _userNotificationRepository;
    readonly IRepository<Notification> _notificationRepository;
    readonly IUserContext _userContext;
    public CreateUserNotificationCommandHandler(IUnitOfWork unitOfWork, 
        IUserNotificationRepository userNotificationRepository, 
        IRepository<Notification> notificationRepository, IUserContext userContext)
    {
        _unitOfWork = unitOfWork;
        _userNotificationRepository = userNotificationRepository;
        _notificationRepository = notificationRepository;
        _userContext = userContext;
    }

    public async Task<OperationResult<UserNotification>> Handle(CreateUserNotificationCommand request, CancellationToken cancellationToken)
    {
        //check if message is null, if not create UserNotification with the current message.
        //If null check type, get notifications from repository
        //Enum Helper
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
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        operationResult.RelatedObject = userNotification;

        return operationResult;
    }
}