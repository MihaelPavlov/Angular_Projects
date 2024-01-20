namespace TRINV.Application.Commands.Notifications;

using Domain.Entities;
using MediatR;
using System.ComponentModel.DataAnnotations;
using Domain.Validations;
using Shared.Business.Utilities;
using Shared.Business.Exceptions;
using Enums;
using Interfaces;
using Shared.Business.Extension;
using Shared.Business.Helpers;

public record CreateNotificationCommand : IRequest<OperationResult>
{
    [Required]
    public int NotificationType { get; set; }

    [Required]
    [MaxLength(200)]
    public string Message { get; set; } = string.Empty;
}

internal class CreateNotificationCommandHandler : IRequestHandler<CreateNotificationCommand, OperationResult>
{
    readonly IRepository<Notification> _repository;
    readonly IUnitOfWork _unitOfWork;

    public CreateNotificationCommandHandler(IUnitOfWork unitOfWork, IRepository<Notification> repository)
    {
        _unitOfWork = unitOfWork;
        _repository = repository;
    }

    public async Task<OperationResult> Handle(CreateNotificationCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult();

        //TODO: Test if this is working
        if (EnumerationHelper.GetAll().Any(x => x.Id == request.NotificationType))
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException($"{nameof(Notification)} of type: {request.NotificationType} was not found."));

        var notification = new Notification
        {
            NotificationType = request.NotificationType,
            Message = request.Message,
        };

        await _repository.AddAsync(notification, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return operationResult;
    }
}