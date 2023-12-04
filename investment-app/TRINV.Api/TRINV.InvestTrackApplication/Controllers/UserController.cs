namespace TRINV.InvestTrackApplication.Controllers;

using System.Text;
using System.Text.Json;
using Application.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
[AllowAnonymous]
public class UserController : ControllerBase
{
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserCommand command)
    {
        var json = JsonSerializer.Serialize(command);
        var httpClient = new HttpClient();
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        var response = await httpClient.PostAsync("https://(localhost)/api/authenticate", content);
        if (response.IsSuccessStatusCode)
        {
            return Ok("New user added successfully.");
        }

        return BadRequest("The operation was not successful.");
    }
}
