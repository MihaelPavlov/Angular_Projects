namespace TRINV.Application.Commands;

using MediatR;
using System.Text;
using System.Text.Json;
using System.ComponentModel.DataAnnotations;

public record CreateIdentityUserCommand : IRequest
{
    [Required]
    [StringLength(20, ErrorMessage = "The Username must be between 3 and 20 characters long.", MinimumLength = 3)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [StringLength(100, ErrorMessage = "The Password must be between 6 and 100 characters long.", MinimumLength = 6)]
    public string Password { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
}

public class CreateIdentityUserCommandHandler : IRequestHandler<CreateIdentityUserCommand>
{
    public async Task Handle(CreateIdentityUserCommand request, CancellationToken cancellationToken)
    {
        var json = JsonSerializer.Serialize(new CreateIdentityUserModel(request.Username, request.Password, request.Email));
        var httpClient = new HttpClient();
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        var response = await httpClient.PostAsync("https://localhost:5001/api/User", content);

        //Handle the different errors
        // they might be errors like required symbols and etc. We need to return it to the front-end
        if (!response.IsSuccessStatusCode)
        {
            throw new Exception("Failed to create user.");
        }
    }
}

public record CreateIdentityUserModel(string Username, string Password, string Email);
