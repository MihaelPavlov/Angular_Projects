namespace TRINV.Application.Commands.Notifications;

using Domain.Entities;
using Domain.Enums;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Utilities;
using Domain.Validations;
using System.ComponentModel.DataAnnotations;
using static Domain.Validations.EntityValidationConstants.Notifications;

public record UpdateNotificationCommand : IRequest<OperationResult<Notification>>
{
    [Required]
    public int Id { get; set; }

    [Required]
    public NotificationType NotificationType { get; set; }

    [Required]
    [MaxLength(MessageMaxLength)]
    public string Message { get; set; } = string.Empty;
}

internal class UpdateNotificationCommandHandler : IRequestHandler<UpdateNotificationCommand, OperationResult<Notification>>
{
    readonly IRepository<Notification> _repository;
    readonly IUnitOfWork _unitOfWork;

    public UpdateNotificationCommandHandler(IUnitOfWork unitOfWork, IRepository<Notification> repository)
    {
        _unitOfWork = unitOfWork;
        _repository = repository;
    }

    public async Task<OperationResult<Notification>> Handle(UpdateNotificationCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<Notification>();

        if (Ensure.IsEnumOutOfRange(request.NotificationType))
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException($"{nameof(Notification)} of type: {request.NotificationType} was not found."));

        var notification = await _repository.GetByIdAsync(request.Id, cancellationToken);

        if (notification == null)
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException($"{nameof(Notification)} was not found."));

        notification.NotificationType = request.NotificationType;
        notification.Message = request.Message;

        _repository.Update(notification);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        operationResult.RelatedObject = notification;

        return operationResult;
    }
}
