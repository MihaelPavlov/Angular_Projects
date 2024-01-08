﻿namespace TRINV.IdentityServer.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Commands;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http.Metadata;
using TRINV.Shared.Business.Utilities;

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
    public async Task<OperationErrorObject> CreateUser([FromBody] CreateUserCommand command)
    {
        var result = await _mediator.Send(command);
        return result;
    }
}