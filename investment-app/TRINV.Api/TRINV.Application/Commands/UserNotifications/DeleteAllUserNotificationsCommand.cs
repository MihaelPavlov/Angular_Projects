namespace TRINV.Application.Commands.UserNotifications;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Utilities;

public record DeleteAllUserNotificationsCommand : IRequest<OperationResult>;

internal class DeleteAllUserNotificationsCommandHandler : IRequestHandler<DeleteAllUserNotificationsCommand, OperationResult>
{

    readonly IUserContext _userContext;
    readonly IUnitOfWork _unitOfWork;
    readonly IRepository<UserNotification> _notificationRepository;

    public DeleteAllUserNotificationsCommandHandler(
        IUserContext userContext, 
        IUnitOfWork unitOfWork, 
        IRepository<UserNotification> notificationRepository)
    {
        _userContext = userContext;
        _unitOfWork = unitOfWork;
        _notificationRepository = notificationRepository;
    }

    public async Task<OperationResult> Handle(DeleteAllUserNotificationsCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult();

        var notifications = await _notificationRepository
            .GetAllAsync(cancellationToken);
        var userNotifications = notifications
            .Where(x => x.UserId == _userContext.UserId && x.IsDeleted == false)
            .ToList();
        if (userNotifications.Any())
        {
            foreach (var userNot in userNotifications)
            {
                userNot.IsDeleted = true;
            }
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }

        return operationResult;
    }
}