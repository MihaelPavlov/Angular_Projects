namespace TRINV.Application.Commands.Notifications;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Utilities;

public record DeleteNotificationCommand(int NotificationId) : IRequest<OperationResult<Notification>>;

internal class DeleteNotificationCommandHandler : IRequestHandler<DeleteNotificationCommand, OperationResult<Notification>>
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

    public async Task<OperationResult<Notification>> Handle(DeleteNotificationCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<Notification>();

        var notification = await _notificationRepository
                    .GetByIdAsync(request.NotificationId, cancellationToken);

        if (notification == null)
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException($"{nameof(Notification)} was not found."));

        notification.IsDeleted = true;

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        operationResult.RelatedObject = notification;

        return operationResult;
    }
}
