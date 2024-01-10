namespace TRINV.InvestTrackApplication.Controllers;

using Application.Commands.News;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Shared.Business.Utilities;
using Application.Queries.News;

[Route("api/[controller]")]
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
        await _mediator.Send(command);

        return Ok();
    }

    [HttpPost("deleteNews")]
    public async Task<IActionResult> DeleteNews([FromBody] DeleteNewsCommand command)
    {
        await _mediator.Send(command);

        return Ok();
    }

    [HttpPost("updateNews")]
    public async Task<OperationResult<News>> UpdateNews([FromBody] UpdateNewsCommand command)
    {
        return await _mediator.Send(command);
    }

    [HttpGet("getAllNews")]
    public async Task<IActionResult> GetNews()
    {
        var news = await _mediator.Send(new GetAllNewsQuery());

        return Ok(news);
    }

    [HttpGet("{id}")]
    public async Task<OperationResult<News>> GetNewsById(int id)
    {
        return await _mediator.Send(new GetNewsByIdQuery(id));
    }
}
