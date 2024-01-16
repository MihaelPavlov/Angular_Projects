namespace TRINV.Application.Commands.Notifications;

using Domain.Entities;
using Domain.Enums;
using MediatR;
using System.ComponentModel.DataAnnotations;
using Shared.Business.Utilities;
using Shared.Business.Exceptions;
using Domain.Validations;
using Interfaces;
using Shared.Business.Extension;
using static Domain.Validations.EntityValidationConstants.Notifications;

public record CreateNotificationCommand : IRequest<OperationResult<Notification>>
{
    [Required]
    public NotificationType NotificationType { get; set; }

    [Required]
    [MaxLength(MessageMaxLength)]
    public string Message { get; set; } = string.Empty;
}

internal class CreateNotificationCommandHandler : IRequestHandler<CreateNotificationCommand, OperationResult<Notification>>
{
    readonly IRepository<Notification> _repository;
    readonly IUnitOfWork _unitOfWork;

    public CreateNotificationCommandHandler(IUnitOfWork unitOfWork, IRepository<Notification> repository)
    {
        _unitOfWork = unitOfWork;
        _repository = repository;
    }

    public async Task<OperationResult<Notification>> Handle(CreateNotificationCommand request,
        CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<Notification>();

        if (Ensure.IsEnumOutOfRange(request.NotificationType))
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException($"{nameof(Notification)} of type: {request.NotificationType} was not found."));

        var notification = new Notification
        {
            NotificationType = request.NotificationType,
            Message = request.Message,
        };

        await _repository.Insert(notification, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        operationResult.RelatedObject = notification;

        return operationResult;
    }
}