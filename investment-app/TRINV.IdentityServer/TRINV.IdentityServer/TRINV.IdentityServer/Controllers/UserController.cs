using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static Duende.IdentityServer.IdentityServerConstants;

namespace TRINV.IdentityServer.Controllers
{
    [Authorize(LocalApi.PolicyName)]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public IActionResult Index()
        {
            return this.Ok();
        }

    }
}