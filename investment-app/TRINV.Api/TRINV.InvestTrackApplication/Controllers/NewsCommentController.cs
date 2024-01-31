namespace TRINV.InvestTrackApplication.Controllers;

using Application.Commands.NewsComment;
using Application.Queries.NewsComment;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shared.Business.Utilities;

[ApiController]
[AllowAnonymous]
[Route("[controller]")]
public class NewsCommentController : ControllerBase
{
    readonly IMediator _mediator;

    public NewsCommentController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult<IEnumerable<GetAllCommentsByNewsIdQueryModel>>))]
    public async Task<IActionResult> GetNewsCommentList([FromQuery] int newsId, CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(new GetAllCommentsByNewsIdQuery(newsId), cancellationToken));

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult<GetNewsCommentByIdQueryModel>))]
    public async Task<IActionResult> GetNewsCommentById(int id, CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(new GetNewsCommentByIdQuery(id), cancellationToken));

    [HttpPost]
    [Authorize(Policy = "ApiScope")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult))]
    public async Task<IActionResult> CreateNewsComment([FromBody] CreateNewsCommentCommand command, CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(command, cancellationToken));

    [HttpDelete]
    [Authorize(Policy = "ApiScope")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult))]
    public async Task<IActionResult> DeleteNewsComment([FromBody] DeleteNewsCommentCommand command, CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(command, cancellationToken));

    [HttpPut]
    [Authorize(Policy = "ApiScope")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult))]
    public async Task<IActionResult> UpdateNewsComment([FromBody] UpdateNewsCommentCommand command, CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(command, cancellationToken));
}