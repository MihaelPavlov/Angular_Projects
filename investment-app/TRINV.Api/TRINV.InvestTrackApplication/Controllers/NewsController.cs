namespace TRINV.InvestTrackApplication.Controllers;

using Application.Commands.News;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Shared.Business.Utilities;
using Application.Queries.News;

[Route("[controller]")]
[ApiController]
public class NewsController : ControllerBase
{
    readonly IMediator _mediator;

    public NewsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("createNews")]
    public async Task<IActionResult> CreateNews([FromBody] CreateNewsCommand command)
    {
        return Ok(await _mediator.Send(command));
    }

    [HttpDelete("deleteNews")]
    public async Task<IActionResult> DeleteNews([FromBody] DeleteNewsCommand command)
    {
        return Ok(await _mediator.Send(command));
    }

    [HttpPut("updateNews")]
    public async Task<OperationResult<News>> UpdateNews([FromBody] UpdateNewsCommand command)
    {
        return await _mediator.Send(command);
    }

    [HttpGet("getAllNews")]
    public async Task<IActionResult> GetNews()
    {
        return Ok(await _mediator.Send(new GetAllNewsQuery()));
    }

    [HttpGet("{id}")]
    public async Task<OperationResult<News>> GetNewsById(int id)
    {
        return await _mediator.Send(new GetNewsByIdQuery(id));
    }
}
