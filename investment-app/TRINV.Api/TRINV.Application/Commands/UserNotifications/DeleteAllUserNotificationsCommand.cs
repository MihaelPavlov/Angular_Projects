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

    public DeleteAllUserNotificationsCommandHandler(
        IUserContext userContext, 
        IUnitOfWork unitOfWork)
    {
        _userContext = userContext;
        _unitOfWork = unitOfWork;
    }

    public async Task<OperationResult> Handle(DeleteAllUserNotificationsCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult();

        //TODO: implement

        return operationResult;
    }
}