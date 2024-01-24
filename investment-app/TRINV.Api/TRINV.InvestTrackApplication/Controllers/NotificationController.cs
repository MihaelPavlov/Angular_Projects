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

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult<IEnumerable<GetAllNotificationsQueryModel>>))]
    public async Task<IActionResult> GetNotificationsList(CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(new GetAllNotificationsQuery(), cancellationToken));

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult<Notification>))]
    public async Task<IActionResult> GetNotificationById(int id, CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(new GetNotificationByIdQuery(id), cancellationToken));
    
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult<Notification>))]
    public async Task<IActionResult> CreateNotification([FromBody] CreateNotificationCommand command, CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(command, cancellationToken));
    
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult))]
    public async Task<IActionResult> DeleteNotification([FromBody] DeleteNotificationCommand command, CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(command, cancellationToken));
    
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult))]
    public async Task<IActionResult> UpdateNotification([FromBody] UpdateNotificationCommand command, CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(command, cancellationToken));
    
}