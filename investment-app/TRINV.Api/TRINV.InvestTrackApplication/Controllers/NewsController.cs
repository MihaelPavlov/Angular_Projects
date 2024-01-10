namespace TRINV.InvestTrackApplication.Controllers;

using Application.Commands.News;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Shared.Business.Utilities;
using TRINV.Application.Queries.News;

[Route("api/[controller]")]
[ApiController]
public class NewsController : ControllerBase
{
    readonly IMediator _mediator;

    public NewsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateNews([FromBody] CreateNewsCommand command)
    {
        await _mediator.Send(command);

        return Ok();
    }

    [HttpPost("delete")]
    public async Task<IActionResult> DeleteNews([FromBody] DeleteNewsCommand command)
    {
        await _mediator.Send(command);

        return Ok();
    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateNews([FromBody] UpdateNewsCommand command)
    {
        await _mediator.Send(command);

        return Ok();
    }

    [HttpGet("{id}")]
    public async Task<OperationResult<News>> GetNewsById(int id)
    {
        return await _mediator.Send(new GetNewsByIdQuery(id));
    }
}
