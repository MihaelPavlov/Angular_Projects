namespace TRINV.InvestTrackApplication.Controllers;

using System.Text;
using System.Text.Json;
using Application.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task CreateUser(CreateIdentityUserCommand command)
    { 
        await _mediator.Send(command);
    }
}