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

    public DeleteUserNotificationCommandHandler(
        IUnitOfWork unitOfWork,
        IUserContext userContext)
    {
        _unitOfWork = unitOfWork;
        _userContext = userContext;
    }

    public async Task<OperationResult> Handle(DeleteUserNotificationCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult();

        //TODO: Implement

        return operationResult;
    }
}