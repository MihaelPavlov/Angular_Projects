namespace TRINV.IdentityServer.Commands;

using Microsoft.AspNetCore.Identity;
using MediatR;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using TRINV.IdentityServer.Application.Common.Models;
using TRINV.IdentityServer.Data.Models;

public class CreateUserCommand : IRequest<IdentityResult>
{
    [Required]
    public string UserName { get; set; }

    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
}

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, IdentityResult>
{
    readonly UserManager<ApplicationUser> _userManager;

    public CreateUserCommandHandler(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<IdentityResult> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var userCheck = await _userManager.FindByEmailAsync(request.Email.ToUpper());
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

        var result = _userManager.CreateAsync(user, request.Password).Result;
        if (!result.Succeeded)
        {
            throw new Exception(string.Join(" ", result.Errors.Select(x => x.Description)));
        }

        result = _userManager.AddClaimAsync(user, new Claim(Claims.RoleKey, ((int)Role.User).ToString())).Result;

        if (!result.Succeeded)
        {
            throw new Exception(string.Join(" ", result.Errors.Select(x => x.Description)));
        }

        return result;
    }
}