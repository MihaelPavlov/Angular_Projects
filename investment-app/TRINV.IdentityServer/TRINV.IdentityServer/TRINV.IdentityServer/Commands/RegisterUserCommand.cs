namespace TRINV.IdentityServer.Commands
{
    using Data.Seed;
    using MediatR;
    using Microsoft.AspNetCore.Identity;
    using System.Security.Claims;
    using TRINV.IdentityServer.Application.Common.Models;
    using TRINV.IdentityServer.Data.Models;

    public class RegisterUserCommand : IRequest<IdentityResult>
    {
        public string UserName { get; set; }
        public string Email { get; set; }
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
                EmailConfirmed = true,
                AccountEnabled = true,
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            return result;
        }
    }
}
