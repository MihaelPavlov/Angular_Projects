namespace TRINV.InvestTrackApplication.Controllers;

using Application.Commands.UserNotifications;
using Application.Queries.UserNotifications;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Shared.Business.Utilities;
using TRINV.Application.Queries.News;

[Route("[controller]")]
[ApiController]
public class UserNotificationController : ControllerBase
{
    readonly IMediator _mediator;

    public UserNotificationController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult<IEnumerable<UserNotification>>))]
    public async Task<IActionResult> GetUserNotificationsList(CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(new GetAllUserNotificationsQuery(), cancellationToken));

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult<UserNotification>))]
    public async Task<IActionResult> GetUserNotificationById(int id, CancellationToken cancellationToken) =>
         this.Ok(await _mediator.Send(new GetUserNotificationIdQuery(id), cancellationToken));

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult))]
    public async Task<IActionResult> CreateUserNotification([FromBody] CreateUserNotificationCommand command, CancellationToken cancellationToken) => 
        this.Ok(await _mediator.Send(command, cancellationToken));

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult))]
    public async Task<IActionResult> DeleteUserNotification([FromBody] DeleteUserNotificationCommand command, CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(command, cancellationToken));

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult))]
    public async Task<IActionResult> DeleteAllUserNotification([FromBody] DeleteUserNotificationCommand command, CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(command, cancellationToken));

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult))]
    public async Task<IActionResult> UpdateUserNotification([FromBody] UpdateUserNotificationCommand command, CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(command, cancellationToken));
}