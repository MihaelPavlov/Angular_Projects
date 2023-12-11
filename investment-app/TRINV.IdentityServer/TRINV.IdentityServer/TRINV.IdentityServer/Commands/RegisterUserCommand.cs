namespace TRINV.IdentityServer.Commands;

using System.ComponentModel.DataAnnotations;
using MediatR;
using Microsoft.AspNetCore.Identity;
using TRINV.IdentityServer.Data.Models;

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
        var user = new ApplicationUser
        {
            UserName = request.UserName,
            Email = request.Email,
            //This might need to be changed in future.
            EmailConfirmed = true,
            AccountEnabled = true,
        };

        var result = await _userManager.CreateAsync(user, request.Password);

        return result;
    }
}