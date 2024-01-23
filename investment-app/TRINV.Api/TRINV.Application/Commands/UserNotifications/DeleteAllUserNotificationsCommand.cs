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
    readonly IRepository<UserNotification> _userNotificationRepository;

    public DeleteAllUserNotificationsCommandHandler(
        IUserContext userContext, 
        IUnitOfWork unitOfWork, 
        IRepository<UserNotification> userNotificationRepository)
    {
        _userContext = userContext;
        _unitOfWork = unitOfWork;
        _userNotificationRepository = userNotificationRepository;
    }

    public async Task<OperationResult> Handle(DeleteAllUserNotificationsCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult();

        var userNotifications = await _userNotificationRepository
            .GetAllWithPredicateAsync(x => 
                x.UserId == _userContext.UserId && 
                x.IsDeleted == false, cancellationToken);

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