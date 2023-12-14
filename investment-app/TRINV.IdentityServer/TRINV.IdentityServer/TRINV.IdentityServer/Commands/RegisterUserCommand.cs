namespace TRINV.IdentityServer.Commands;

using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using IdentityModel;
using MediatR;
using Microsoft.AspNetCore.Identity;
using TRINV.IdentityServer.Application.Common.Models;
using TRINV.IdentityServer.Data.Models;
using static TRINV.IdentityServer.Data.Seed.PredefinedUsers;

public class RegisterUserCommand : IRequest<IdentityResult>
{
    [Required]
    public string UserName { get; set; }

    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
}

public class CreateUserCommandHandler : IRequestHandler<RegisterUserCommand, IdentityResult>
{
    readonly UserManager<ApplicationUser> _userManager;

    public CreateUserCommandHandler(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;

    }

    public async Task<IdentityResult> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var userCheck = await _userManager.FindByEmailAsync(request.Email);
        if (userCheck != null)
        {
            throw new Exception("User with provided email already exists!");
        }

        var user = new ApplicationUser()
        {
            UserName = request.UserName,
            Email = request.Email,
            EmailConfirmed = true,
            AccountEnabled = true
        };

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            throw new Exception(string.Join(" ", result.Errors.Select(x => x.Description)));
        }

        result = await _userManager.AddClaimAsync(user, new Claim(Claims.RoleKey, ((int)Role.User).ToString()));
        if (!result.Succeeded)
        {
            throw new Exception(string.Join(" ", result.Errors.Select(x => x.Description)));
        }

        return result;
    }
}