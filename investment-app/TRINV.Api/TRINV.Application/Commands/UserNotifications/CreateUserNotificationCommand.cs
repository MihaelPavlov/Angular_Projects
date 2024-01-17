﻿namespace TRINV.Application.Commands.UserNotifications;

using Domain.Entities;
using Enums;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;

public record CreateUserNotificationCommand(int NotificationType, string? Message = null) : IRequest<OperationResult<UserNotification>>;

//TODO: Add Message
internal class CreateUserNotificationCommandHandler : IRequestHandler<CreateUserNotificationCommand, OperationResult<UserNotification>>
{
    readonly IUnitOfWork _unitOfWork;
    readonly IRepository<UserNotification> _notificationRepository;
    readonly IUserContext _userContext;
    public CreateUserNotificationCommandHandler(
        IUnitOfWork unitOfWork, 
        IRepository<UserNotification> notificationRepository,
        IUserContext userContext)
    {
        _unitOfWork = unitOfWork;
        _notificationRepository = notificationRepository;
        _userContext = userContext;
    }

    public async Task<OperationResult<UserNotification>> Handle(CreateUserNotificationCommand request, CancellationToken cancellationToken)
    {
        //If null check type, get notifications from repository
        //check if message is null, if not create UserNotification with the current message.
        //Enum Helper
        var operationResult = new OperationResult<UserNotification>();

        if(!NotificationType.ExistById(request.NotificationType))
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException("Notification type not found!"));
        
        var message = request.Message;

        if (request.Message == null)
        {
            message = NotificationType.GetMessageById(request.NotificationType);
        }

        var notification = new UserNotification
        {
            UserId = _userContext.UserId,
            NotificationType = request.NotificationType,
            Message = message,
            ReceivedDate = DateTime.Now,
        };

        await _notificationRepository.Insert(notification, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        operationResult.RelatedObject = notification;

        return operationResult;
    }
}