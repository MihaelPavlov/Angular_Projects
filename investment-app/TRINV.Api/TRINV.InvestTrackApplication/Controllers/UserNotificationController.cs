namespace TRINV.InvestTrackApplication.Controllers;

using Application.Commands.UserNotifications;
using Application.Queries.UserNotifications;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Shared.Business.Utilities;

[Route("[controller]")]
[ApiController]
public class UserNotificationController : ControllerBase
{
    readonly IMediator _mediator;

    public UserNotificationController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<OperationResult<UserNotification>> CreateUserNotification([FromBody] CreateUserNotificationCommand command)
    {
        return await _mediator.Send(command);
    }

    [HttpGet]
    public async Task<OperationResult<IEnumerable<UserNotification>>> GetAllUserNotifications()
    {
        return await _mediator.Send(new GetAllUserNotificationsQuery());
    }

    [HttpGet("{id}")]
    public async Task<OperationResult<UserNotification>> GetUserNotificationById(int notificationId)
    {
        return await _mediator.Send(new GetUserNotificationIdQuery(notificationId));
    }

    [HttpPut("{id}")]
    public async Task<OperationResult> UpdateUserNotification([FromBody] UpdateUserNotificationCommand command)
    {
        return await _mediator.Send(command);
    }

    [HttpDelete("{id}")]
    public async Task<OperationResult> DeleteUserNotification([FromBody] DeleteUserNotificationCommand command)
    {
        return await _mediator.Send(command);
    }
}

