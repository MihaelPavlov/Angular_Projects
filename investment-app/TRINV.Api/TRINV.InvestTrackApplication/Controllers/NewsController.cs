namespace TRINV.InvestTrackApplication.Controllers;

using Application.Commands.News;
using Microsoft.AspNetCore.Mvc;
using MediatR;

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
}
