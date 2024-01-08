namespace TRINV.IdentityServer.Commands;

using Microsoft.AspNetCore.Identity;
using MediatR;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using TRINV.IdentityServer.Application.Common.Models;
using TRINV.IdentityServer.Data.Models;
using TRINV.Shared.Business.Exceptions;
using TRINV.Shared.Business.Utilities;
using Duende.IdentityServer.Validation;

public class CreateUserCommand : IRequest<OperationErrorObject>
{
    [Required]
    public string UserName { get; set; } = string.Empty;

    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, OperationErrorObject>
{
    readonly UserManager<ApplicationUser> _userManager;

    public CreateUserCommandHandler(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<OperationErrorObject> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult();
        var isUserEmailExist = await _userManager.FindByEmailAsync(request.Email.ToUpper());

        if (isUserEmailExist != null)
        {
            operationResult.AppendErrorMessage(ErrorMessages.UserEmailExist, "Email", ErrorCode.ValidationError);
            operationResult.AppendErrorMessage("Username is Invalid !", "Username", ErrorCode.ValidationError);

            return operationResult.GetResult();
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
            throw new BadRequestException(ErrorMessages.UnsuccessfulOperation);

        result = _userManager.AddClaimAsync(user, new Claim(Claims.RoleKey, ((int)Role.User).ToString())).Result;

        if (!result.Succeeded)
            throw new BadRequestException(ErrorMessages.UnsuccessfulOperation);
        
        return operationResult.GetResult();
    }
}
