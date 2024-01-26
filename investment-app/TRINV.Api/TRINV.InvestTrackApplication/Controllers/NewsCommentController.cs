namespace TRINV.InvestTrackApplication.Controllers;

using Application.Commands.NewsComment;
using Application.Queries.NewsComment;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shared.Business.Utilities;

[Route("[controller]")]
[ApiController]
public class NewsCommentController : ControllerBase
{
    readonly IMediator _mediator;

    public NewsCommentController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult<IEnumerable<GetAllCommentsByNewsIdQueryModel>>))]
    public async Task<IActionResult> GetNewsCommentList(int newsId, CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(new GetAllCommentsByNewsIdQuery(newsId), cancellationToken));

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult<GetNewsCommentByIdQueryModel>))]
    public async Task<IActionResult> GetNewsCommentById(int id, CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(new GetNewsCommentByIdQuery(id), cancellationToken));

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult))]
    public async Task<IActionResult> CreateNewsComment([FromBody] CreateNewsCommentCommand command, CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(command, cancellationToken));

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult))]
    public async Task<IActionResult> DeleteNewsComment(int id, CancellationToken cancellationToken) => 
        this.Ok(await _mediator.Send(new DeleteNewsCommentCommand(id), cancellationToken));

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult))]
    public async Task<IActionResult> UpdateNewsComment([FromBody] UpdateNewsCommentCommand command, CancellationToken cancellationToken) =>
        this.Ok(await _mediator.Send(command, cancellationToken));
}