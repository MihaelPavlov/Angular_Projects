namespace TRINV.Application.Commands.UserNotifications;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Utilities;

public record DeleteUserNotificationCommand(int NotificationId) : IRequest<OperationResult<UserNotification>>;

internal class DeleteUserNotificationCommandHandler : IRequestHandler<DeleteUserNotificationCommand, OperationResult<UserNotification>>
{
    readonly IUnitOfWork _unitOfWork;
    readonly IUserNotificationRepository _userNotificationRepository;
    readonly IUserContext _userContext;

    public DeleteUserNotificationCommandHandler(IUnitOfWork unitOfWork, IUserNotificationRepository userNotificationRepository, IUserContext userContext)
    {
        _unitOfWork = unitOfWork;
        _userNotificationRepository = userNotificationRepository;
        _userContext = userContext;
    }

    public async Task<OperationResult<UserNotification>> Handle(DeleteUserNotificationCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<UserNotification>();

        UserNotification? userNotification = await _userNotificationRepository.GetUserNotificationByIdAsync(
            request.NotificationId, _userContext.UserId, cancellationToken);

        if (userNotification == null || userNotification.IsDeleted)
            return operationResult.ReturnWithErrorMessage(new NotFoundException(
    $"{nameof(UserNotification)} was not found!"));

        var isDeleted = _userNotificationRepository.DeleteNotification(request.NotificationId, _userContext.UserId);

        if (!isDeleted)
            return operationResult.ReturnWithErrorMessage(
                new BadRequestException("Operation was not successful!"));

        operationResult.RelatedObject = userNotification;

        return operationResult;
    }
}