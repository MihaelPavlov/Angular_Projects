namespace TRINV.InvestTrackApplication.Controllers;

using Application.Commands.News;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Shared.Business.Utilities;
using Application.Queries.News;
using Microsoft.AspNetCore.Authorization;

[Route("[controller]")]
[ApiController]
[AllowAnonymous]
public class NewsController : ControllerBase
{
    readonly IMediator _mediator;

    public NewsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult<IEnumerable<GetAllNewsQueryModel>>))]
    public async Task<IActionResult> GetNewsList(CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(new GetAllNewsQuery(), cancellationToken));

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult<GetNewsByIdQueryModel>))]
    public async Task<IActionResult> GetNewsById(int id, CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(new GetNewsByIdQuery(id), cancellationToken));

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult))]
    public async Task<IActionResult> CreateNews([FromBody] CreateNewsCommand command, CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(command, cancellationToken));

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult))]
    public async Task<IActionResult> DeleteNews([FromBody] DeleteNewsCommand command, CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(command, cancellationToken));

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult))]
    public async Task<IActionResult> UpdateNews([FromBody] UpdateNewsCommand command, CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(command, cancellationToken));

}
