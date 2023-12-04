namespace TRINV.Application.Commands;

using System.ComponentModel.DataAnnotations;
using MediatR;

public record CreateUserCommand : IRequest<object>
{
    [Required]
    [StringLength(20, ErrorMessage = "The Username must be between 3 and 20 characters long.", MinimumLength = 3)]
    public string Username { get; set; }

    [Required]
    [StringLength(100, ErrorMessage = "The Password must be between 6 and 100 characters long.", MinimumLength = 6)]
    public string Password { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }
}

internal class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, object>
{
    public Task<object> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var user = new
        {
            request.Username,
            request.Password,
            request.Email,
        };

        return Task.FromResult<object>(user);
    }

    /*
    Part client.
    Need user input. Username, password, email
    Validation of input.
    HttpClient for server to server communication.
    Validation of client.
    Initialize request trough HttpClient.
    Check the result from request.

    Part IdentityServer.
    create request in controller.
    create command. 
    Check seed data. 
    Email validation. 
    Adding claim to user.
    Create user.
    variant 1 trough DbContext
    variant 2 trough UserManager<ApplicationUser>

    */

}
