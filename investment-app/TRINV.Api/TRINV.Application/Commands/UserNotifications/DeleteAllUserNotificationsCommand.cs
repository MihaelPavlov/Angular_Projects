namespace TRINV.Application.Commands.UserNotifications;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;

public record DeleteAllUserNotificationsCommand : IRequest<OperationResult<bool>>;

internal class DeleteAllUserNotificationsCommandHandler : IRequestHandler<DeleteAllUserNotificationsCommand, OperationResult<bool>>
{
    readonly IUserNotificationRepository _userNotificationRepository;
    readonly IUserContext _userContext;
    readonly IUnitOfWork _unitOfWork;

    public DeleteAllUserNotificationsCommandHandler(
        IUserNotificationRepository userNotificationRepository, 
        IUserContext userContext, 
        IUnitOfWork unitOfWork)
    {
        _userNotificationRepository = userNotificationRepository;
        _userContext = userContext;
        _unitOfWork = unitOfWork;
    }

    public async Task<OperationResult<bool>> Handle(DeleteAllUserNotificationsCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<bool>();

        var isSuccess = _userNotificationRepository.DeleteAllNotificationsForUser(_userContext.UserId);

        if (!isSuccess)
            return operationResult.ReturnWithErrorMessage(
                new BadRequestException("Operation was not successful!"));

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        operationResult.RelatedObject = isSuccess;

        return operationResult;
    }
}