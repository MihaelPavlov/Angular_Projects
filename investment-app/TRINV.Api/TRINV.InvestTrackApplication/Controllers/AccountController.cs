using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TRINV.InvestTrackApplication.Commands;

namespace TRINV.InvestTrackApplication.Controllers;

[Route("[controller]")]
public class AccountController : ControllerBase
{
    readonly IMediator _mediator;
    readonly ILogger<AccountController> _logger;
    readonly IHttpContextAccessor _contextAccessor;

    public AccountController(IMediator mediator, ILogger<AccountController> logger, IHttpContextAccessor contextAccessor)
    {
        _mediator = mediator;
        _logger = logger;
        _contextAccessor = contextAccessor;
    }

    [AllowAnonymous]
    [HttpGet]
    [Route("authorize")]
    public async Task<IActionResult> AuthorizeByCode([FromHeader(Name = "code")] string code, [FromHeader(Name = "code_verifier")] string codeVerifier)
    {
        try
        {
            var userInfo = await _mediator.Send(new AuthorizeIdentityUserByCodeCommand(code, codeVerifier));

            if (userInfo == null)
                return StatusCode(StatusCodes.Status406NotAcceptable, "Code is not acceptable to the tenat and the application.");

            return Ok(userInfo);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "AuthorizeByCode error");
            return Problem("Server error, cannot authorize");
        }
    }

    [HttpGet]
    [Route("userinfo")]
    public async Task<IActionResult> UserInformation()
    {
        try
        {
            var host = _contextAccessor.HttpContext?.Request.Host.Host;
            if (string.IsNullOrEmpty(host))
                return Forbid();

            var userInfo = new UserInfo
            {
                Id = 1,
                FirstName = "Admin",
                LastName = "Admin",
                Email = "admin@trinv.com",
                Role = 0,
            };

            return Ok(userInfo);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "UserInfo error");
            return Problem("Server error, cannot extract user");
        }
    }
}
