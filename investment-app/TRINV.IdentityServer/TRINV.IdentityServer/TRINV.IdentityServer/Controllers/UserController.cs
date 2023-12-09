namespace TRINV.IdentityServer.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using TRINV.IdentityServer.Data.Models;

[Route("api/[controller]")]
[ApiController]
[AllowAnonymous]
public class UserController : ControllerBase
{
    readonly UserManager<ApplicationUser> userManager;

    public UserController(UserManager<ApplicationUser> userManager)
    {
        this.userManager = userManager;
    }

    [HttpPost]
    [AllowAnonymous]
    public Task<IActionResult> CreateUser(TestUser user)
    {
        var appUser = new ApplicationUser
        {
            UserName = user.UserName,
            Email = user.Email,
            PasswordHash = user.Password,
        };

        if (!ModelState.IsValid)
        {
            return Task.FromResult<IActionResult>(BadRequest(ModelState));
        }

        userManager.CreateAsync(appUser);


        return Task.FromResult<IActionResult>(Ok(user));
    }

    public class TestUser
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

