namespace TRINV.Application.Queries.Notification;

using Domain.Entities;
using Interfaces;
using Mapster;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;

public record GetNotificationByIdQuery(int Id) : IRequest<OperationResult<GetNotificationByIdQueryModel>>;

internal class GetNotificationByIdQueryHandler : IRequestHandler<GetNotificationByIdQuery, OperationResult<GetNotificationByIdQueryModel>>
{
    readonly IRepository<Notification> _repository;

    public GetNotificationByIdQueryHandler(IRepository<Notification> repository)
    {
        _repository = repository;
    }

    public async Task<OperationResult<GetNotificationByIdQueryModel>> Handle(GetNotificationByIdQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<GetNotificationByIdQueryModel>();

        var notification = await _repository.GetByIdAsync(request.Id, cancellationToken);

        if (notification == null) 
            return operationResult.ReturnWithErrorMessage(new NotFoundException("No notification was found!"));

        operationResult.RelatedObject = notification.Adapt<GetNotificationByIdQueryModel>();

        return operationResult;
    }
}

public record GetNotificationByIdQueryModel(
    int Id,
    int NotificationType,
    string Message);