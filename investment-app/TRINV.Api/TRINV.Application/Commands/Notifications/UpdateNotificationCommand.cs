namespace TRINV.Application.Commands.Notifications;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Utilities;
using System.ComponentModel.DataAnnotations;
using Enums;
using Shared.Business.Extension;

public record UpdateNotificationCommand : IRequest<OperationResult<Notification>>
{
    [Required]
    public int Id { get; set; }

    [Required]
    public int NotificationType { get; set; }

    [Required]
    [MaxLength(200)]
    public string Message { get; set; } = string.Empty;
}

internal class UpdateNotificationCommandHandler : IRequestHandler<UpdateNotificationCommand, OperationResult>
{
    readonly IRepository<Notification> _repository;
    readonly IUnitOfWork _unitOfWork;

    public UpdateNotificationCommandHandler(IUnitOfWork unitOfWork, IRepository<Notification> repository)
    {
        _unitOfWork = unitOfWork;
        _repository = repository;
    }

    public async Task<OperationResult> Handle(UpdateNotificationCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult();
        //TODO: Throws Server Error 500.
        if (!NotificationType.GetAll<NotificationType>().Any(x => x.Id == request.NotificationType))
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException("Notification type was not found."));

        var notification = await _repository.GetByIdAsync(request.Id, cancellationToken);

        if (notification == null)
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException($"{nameof(Notification)} was not found."));

        notification.NotificationType = request.NotificationType;
        notification.Message = request.Message;

        _repository.Update(notification);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return operationResult;
    }
}
