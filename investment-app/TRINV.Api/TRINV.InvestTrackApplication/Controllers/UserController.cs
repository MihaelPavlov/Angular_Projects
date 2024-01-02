namespace TRINV.InvestTrackApplication.Controllers;

using Application.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[AllowAnonymous]
[Route("[controller]")]
public class UserController : ControllerBase
{
    readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("register")]
    public async Task<IActionResult> CreateUser([FromBody] CreateIdentityUserCommand command)
    {
        await _mediator.Send(command);

        return Ok();
    }
}
