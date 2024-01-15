namespace TRINV.Application.Commands.Notifications;

using Domain.Entities;
using Interfaces;
using MediatR;
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
        throw new NotImplementedException();
    }
}
