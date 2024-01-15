namespace TRINV.Application.Commands.Notifications;

using Domain.Entities;
using Domain.Validations;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Utilities;

public record DeleteNotificationCommand(int UserId, int NotificationId) : IRequest<OperationResult<UserNotification>>;

internal class DeleteNotificationCommandHandler : IRequestHandler<DeleteNotificationCommand, OperationResult<UserNotification>>
{ 
    readonly IUnitOfWork _unitOfWork;
    readonly IUserContext _userContext;

    public DeleteNotificationCommandHandler(
        IUnitOfWork unitOfWork, 
        IUserContext userContext) 
    {
        _unitOfWork = unitOfWork;
        _userContext = userContext;
    }

    public async Task<OperationResult<UserNotification>> Handle(DeleteNotificationCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<UserNotification>();

        var userNotification = _userNotificationRepository.GetByIdAsync(request.UserId, cancellationToken);

        if (Ensure.IsNull(userNotification))
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException($"User with Id: {request.UserId} was not found!"));

        var notificationId = userNotification.Result.NotificationId;
        var notification = _notificationRepository.GetByIdAsync(userNotification.Id, cancellationToken);

        throw new NotImplementedException();
    }
}
