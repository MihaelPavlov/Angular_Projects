namespace TRINV.Application.Commands;

using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json;
using MediatR;

public record CreateUserCommand : IRequest
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

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand>
{
    public async Task Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var user = new
        {
            request.Username,
            request.Password,
            request.Email,
        };

        var json = JsonSerializer.Serialize(user);
        var httpClient = new HttpClient();
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        var response = await httpClient.PostAsync("https://localhost:5001/api/User", content);
        if (!response.IsSuccessStatusCode)
        {
            throw new Exception("Failed to create user.");
        }
    }
}
