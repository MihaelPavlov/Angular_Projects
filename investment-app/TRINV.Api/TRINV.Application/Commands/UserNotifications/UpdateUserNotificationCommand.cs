namespace TRINV.Application.Commands.UserNotifications;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;

public record UpdateUserNotificationCommand : IRequest<OperationResult>
{
    public int Id { get; set; }

    public string Message { get; set; } = string.Empty;

    public int NotificationType { get; set; }

    public bool IsSeen { get; set; }
}



public class UpdateUserNotificationCommandHandler : IRequestHandler<UpdateUserNotificationCommand, OperationResult>
{
    readonly IUnitOfWork _unitOfWork;
    readonly IRepository<UserNotification> _notificationRepository;

    public UpdateUserNotificationCommandHandler(IUnitOfWork unitOfWork, IRepository<UserNotification> notificationRepository)
    {
        _unitOfWork = unitOfWork;
        _notificationRepository = notificationRepository;
    }

    public async Task<OperationResult> Handle(UpdateUserNotificationCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult();

        var notificationToUpdate = await _notificationRepository.GetByIdAsync(request.Id, cancellationToken);

        if (notificationToUpdate == null)
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException("Notification not found!"));

        notificationToUpdate.Message = request.Message;
        notificationToUpdate.NotificationType = request.NotificationType;
        notificationToUpdate.IsSeen = request.IsSeen;

        _notificationRepository.Update(notificationToUpdate);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return operationResult;
    }
}
