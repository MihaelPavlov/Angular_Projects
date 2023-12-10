namespace TRINV.IdentityServer.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Commands;
using MediatR;

[ApiController]
[AllowAnonymous]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody]RegisterUserCommand command)
    {
        var result = await _mediator.Send(command);
        if (result.Succeeded)
        {
            return Ok();
        }
        return BadRequest(result.Errors);
    }
}