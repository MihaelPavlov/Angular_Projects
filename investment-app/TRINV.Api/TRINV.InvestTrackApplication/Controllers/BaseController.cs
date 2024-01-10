namespace TRINV.InvestTrackApplication.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TRINV.Application.Interfaces;

public class BaseController : ControllerBase
{
    readonly IUserContext _userContext;

    public BaseController(IUserContext userContext)
    {
        this._userContext = userContext;
    }

    [Route("/")]
    [Authorize(Policy = "RequiredAdminRole")]
    [HttpGet]
    public IActionResult Index() => new JsonResult(new { text = $"We are hidden. Boom Hackers {this._userContext.UserId}" });
}