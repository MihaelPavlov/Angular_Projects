namespace TRINV.Application.Commands.UserNotifications;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Utilities;

//TODO: Change to accept notification type //should be int
public record CreateUserNotificationCommand(int NotificationType, string? Message = null) : IRequest<OperationResult<UserNotification>>;

internal class CreateUserNotificationCommandHandler : IRequestHandler<CreateUserNotificationCommand, OperationResult<UserNotification>>
{
    readonly IUnitOfWork _unitOfWork;
    readonly IRepository<Notification> _notificationRepository;
    readonly IUserContext _userContext;
    public CreateUserNotificationCommandHandler(
        IUnitOfWork unitOfWork, 
        IRepository<Notification> notificationRepository,
        IUserContext userContext)
    {
        _unitOfWork = unitOfWork;
        _notificationRepository = notificationRepository;
        _userContext = userContext;
    }

    public async Task<OperationResult<UserNotification>> Handle(CreateUserNotificationCommand request, CancellationToken cancellationToken)
    {
        //check if message is null, if not create UserNotification with the current message.
        //If null check type, get notifications from repository
        //Enum Helper
        var operationResult = new OperationResult<UserNotification>();

        return operationResult;
    }
}