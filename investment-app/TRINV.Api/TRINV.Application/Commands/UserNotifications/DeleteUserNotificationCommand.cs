namespace TRINV.Application.Commands.UserNotifications;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;

public record DeleteUserNotificationCommand(int NotificationId) : IRequest<OperationResult>;

internal class DeleteUserNotificationCommandHandler : IRequestHandler<DeleteUserNotificationCommand, OperationResult>
{
    readonly IUnitOfWork _unitOfWork;
    readonly IUserContext _userContext;
    readonly IRepository<UserNotification> _notificationRepository;

    public DeleteUserNotificationCommandHandler(
        IUnitOfWork unitOfWork,
        IUserContext userContext, 
        IRepository<UserNotification> notificationRepository)
    {
        _unitOfWork = unitOfWork;
        _userContext = userContext;
        _notificationRepository = notificationRepository;
    }

    public async Task<OperationResult> Handle(DeleteUserNotificationCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult();

        var notification = await _notificationRepository.GetByIdAsync(request.NotificationId, cancellationToken);

        if (notification == null || notification.UserId != _userContext.UserId || notification.IsDeleted) 
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException("Notification not found!"));

        notification.IsDeleted = true;

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return operationResult;
    }
}