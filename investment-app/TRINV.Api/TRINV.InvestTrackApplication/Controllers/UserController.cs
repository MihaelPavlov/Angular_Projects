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
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<string> CreateUser(CreateUserCommand command)
    {
        return await _mediator.Send(command);
    }
}