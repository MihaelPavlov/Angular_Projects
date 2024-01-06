namespace TRINV.IdentityServer.Commands;

using Microsoft.AspNetCore.Identity;
using MediatR;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using TRINV.IdentityServer.Application.Common.Models;
using TRINV.IdentityServer.Data.Models;
using TRINV.Shared.Business.Exceptions;
using TRINV.Shared.Business.Utilities;

public class CreateUserCommand : IRequest<OperationObject>
{
    [Required]
    public string UserName { get; set; } = string.Empty;

    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    [Required]
    public string Password { get; set; } = string.Empty;
}

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, OperationObject>
{
    readonly ILogger<CreateUserCommand> _logger;
    readonly UserManager<ApplicationUser> _userManager;

    public CreateUserCommandHandler(UserManager<ApplicationUser> userManager, ILogger<CreateUserCommand> logger)
    {
        _userManager = userManager;
        _logger = logger;
    }

    public async Task<OperationObject> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult();
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

        //TODO: return the errors to the caller
        if (!result.Succeeded)
        {
            operationResult.AppendErrorMessage(string.Join(" ", result.Errors.Select(x => x.Description)));
        }

        result = _userManager.AddClaimAsync(user, new Claim(Claims.RoleKey, ((int)Role.User).ToString())).Result;

        //TODO: return the errors to the caller
        if (!result.Succeeded)
        {
            operationResult.AppendErrorMessage(string.Join(" ", result.Errors.Select(x => x.Description)));
        }
        operationResult.AppendErrorMessage("Invalid Username");

        return operationResult.GetResult();
    }
}

public record Response(string[] errors);