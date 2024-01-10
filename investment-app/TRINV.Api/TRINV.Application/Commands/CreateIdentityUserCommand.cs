namespace TRINV.Application.Commands;

using MediatR;
using System.Text;
using System.Text.Json;
using System.ComponentModel.DataAnnotations;
using Domain.Validations;
using Shared.Business.Utilities;


public record CreateIdentityUserCommand : IRequest<OperationErrorObject>
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

public class CreateIdentityUserCommandHandler : IRequestHandler<CreateIdentityUserCommand, OperationErrorObject>
{
    public async Task<OperationErrorObject> Handle(CreateIdentityUserCommand request, CancellationToken cancellationToken)
    {
        Ensure.IsValidEmail(request.Email);
        var json = JsonSerializer.Serialize(new CreateIdentityUserModel(request.Username, request.Password, request.Email));
        var httpClient = new HttpClient();
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        var response = await httpClient.PostAsync("https://localhost:5001/api/User", content);

        //Handle the different errors
        if (!response.IsSuccessStatusCode)
        {
            var responseContent1 = await response.Content.ReadAsStringAsync();
            var errorResponse = JsonSerializer.Deserialize<ErrorResponse>(responseContent1);

            ArgumentNullException.ThrowIfNull(errorResponse);

            return new OperationErrorObject { InitialErrorMessage = errorResponse.detail, IsSuccess = false };
        }

        var responseContent = await response.Content.ReadAsStringAsync();

        var result = JsonSerializer.Deserialize<OperationErrorObject>(responseContent);

        ArgumentNullException.ThrowIfNull(result);

        return result;
    }
}

public record CreateIdentityUserModel(string Username, string Password, string Email);

public record ErrorResponse(int status, string detail);
