namespace TRINV.InvestTrackApplication.Controllers;

using Application.Commands.Notifications;
using Application.Queries.Notification;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Shared.Business.Utilities;

[Route("[controller]")]
[ApiController]
public class NotificationController : ControllerBase
{
    readonly IMediator _mediator;

    public NotificationController(IMediator mediator)
    {
        _mediator = mediator;
    }
    //TODO: implement Check the controller route Naming Convention
    [HttpPost]
    public async Task<OperationResult<Notification>> CreateNotification([FromBody] CreateNotificationCommand command)
    {
        return await _mediator.Send(command);
    }

    [HttpGet]
    public async Task<OperationResult<List<Notification>>> GetAllNotifications()
    {
        return await _mediator.Send(new GetAllNotificationsQuery());
    }

    [HttpGet("{id}")]
    public async Task<OperationResult<Notification>> GetNotificationById(int id)
    {
        return await _mediator.Send(new GetNotificationByIdQuery(id));
    }

    [HttpPut("{id}")]
    public async Task<OperationResult<Notification>> UpdateNotification([FromBody] UpdateNotificationCommand command)
    {
        return await _mediator.Send(command);
    }

    [HttpDelete("{id}")]
    public async Task<OperationResult> DeleteNotification([FromBody] DeleteNotificationCommand command)
    {
        return await _mediator.Send(command);
    }
}