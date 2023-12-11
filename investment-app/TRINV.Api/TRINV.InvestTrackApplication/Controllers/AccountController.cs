using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using TRINV.Application.Commands.Authorization;

namespace TRINV.InvestTrackApplication.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    readonly IMediator _mediator;

    public AccountController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Handling authorization code flow in authentication processes.
    /// </summary>
    /// <param name="code"></param>
    /// <param name="codeVerifier"></param>
    /// <param name="cancellationToken"></param>
    /// <returns>The resulting model includes details such as identity token, access token, refresh token, and user information.</returns>
    [HttpGet]
    [AllowAnonymous]
    [Route("token")]
    public async Task<IActionResult> AuthorizationCodeToken([FromHeader(Name = "code")] string code, [FromHeader(Name = "code_verifier")] string codeVerifier, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new AuthorizationCodeTokenCommand(code, codeVerifier), cancellationToken);
        return Ok(result);
    }

    /// <summary>
    /// This method handles the authorization process for a web client using the Authorization Code flow.
    /// It obtains an access token, retrieves user information, sets up claims for authentication, signs in the user, and returns the parsed user information as an object.
    /// </summary>
    /// <param name="code"></param>
    /// <param name="codeVerifier"></param>
    /// <param name="cancellationToken"></param>
    /// <returns>Returns the parsed user information as an object</returns>
    [HttpGet]
    [AllowAnonymous]
    [Route("authorize")]
    public async Task<IActionResult> AuthorizeByCode([FromHeader(Name = "code")] string code, [FromHeader(Name = "code_verifier")] string codeVerifier, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new AuthorizeByCodeCommand(code, codeVerifier), cancellationToken);
        return Ok(result);
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("anonymous")]
    public IActionResult Anonymous() => new JsonResult(new { success = "anonymous" });

    [HttpGet]
    [Authorize(Policy = "ApiScope")]
    [Route("logout")]
    public async Task<IActionResult> Logout(CancellationToken cancellationToken)
    {
        // Clear the existing external cookie
        await _mediator.Send(new LogoutCommand(), cancellationToken);
        return Ok();
    }

    [HttpGet]
    [Authorize(Policy = "ApiScope")]
    [Route("user-info")]
    public IActionResult UserInformation()
    {
        var subFromClaim = User.FindFirstValue("sub");
        var email = User.FindFirstValue("email");

        // For future use of the session
        var subFromSession = HttpContext.Session.GetString("sub");

        return Ok(new { subFromClaim, email });
    }
}
