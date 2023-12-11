﻿namespace TRINV.IdentityServer.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Commands;
using MediatR;
using Microsoft.AspNetCore.Identity;

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
    public async Task<IdentityResult> CreateUser([FromBody]RegisterUserCommand command)
    {
        return await _mediator.Send(command);
    }
}