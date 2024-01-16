namespace TRINV.IdentityServer.Commands;

using Microsoft.AspNetCore.Identity;
using MediatR;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using TRINV.IdentityServer.Application.Common.Models;
using TRINV.IdentityServer.Data.Models;
using TRINV.Shared.Business.Exceptions;
using TRINV.Shared.Business.Utilities;
using TRINV.Shared.Business.Extension;

public class CreateUserCommand : IRequest<OperationResult>
{
    [Required]
    public string UserName { get; set; } = string.Empty;

    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, OperationResult>
{
    readonly UserManager<ApplicationUser> _userManager;

    public CreateUserCommandHandler(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<OperationResult> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult();
        var isUserEmailExist = await _userManager.FindByEmailAsync(request.Email.ToUpper());

        if (isUserEmailExist != null)
        {
            operationResult.AppendValidationError(ErrorMessages.UserEmailExist, "Email");

            return operationResult;
        }

        var user = new ApplicationUser()
        {
            UserName = request.UserName,
            Email = request.Email,
            EmailConfirmed = true,
            AccountEnabled = true
        };

        // TODO: Remove the uniquness for username
        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
            return operationResult.ReturnWithErrorMessage(new BadRequestException(ErrorMessages.UnsuccessfulOperation));

        result = await _userManager.AddClaimAsync(user, new Claim(Claims.RoleKey, Role.User.ToString()));

        if (!result.Succeeded)
            return operationResult.ReturnWithErrorMessage(new BadRequestException(ErrorMessages.UnsuccessfulOperation));

        return operationResult;
    }
}
