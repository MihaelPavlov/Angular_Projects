namespace TRINV.Application.Commands.Notifications;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Utilities;

public record DeleteNotificationCommand(int NotificationId) : IRequest<OperationResult<UserNotification>>;

internal class DeleteNotificationCommandHandler : IRequestHandler<DeleteNotificationCommand, OperationResult<UserNotification>>
{ 
    readonly IUnitOfWork _unitOfWork;
    readonly IRepository<Notification> _notificationRepository;

    public DeleteNotificationCommandHandler(
        IUnitOfWork unitOfWork, 
        IRepository<Notification> notificationRepository) 
    {
        _unitOfWork = unitOfWork;
        _notificationRepository = notificationRepository;
    }

    public async Task<OperationResult<UserNotification>> Handle(DeleteNotificationCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<UserNotification>();

        throw new NotImplementedException();
    }
}
