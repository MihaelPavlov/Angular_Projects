namespace TRINV.InvestTrackApplication.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
public class BaseController : Controller
{
    [Authorize]
    [Route("/")]
    [HttpGet]
    public string Index() => "We are hidden. Boom Hackers";
}