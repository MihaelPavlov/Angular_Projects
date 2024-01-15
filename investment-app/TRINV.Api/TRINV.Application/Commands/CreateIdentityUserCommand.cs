namespace TRINV.Application.Commands;

using MediatR;
using System.Text;
using System.Text.Json;
using System.ComponentModel.DataAnnotations;
using Domain.Validations;
using TRINV.Shared.Business.Utilities;
using TRINV.Shared.Business.Extension;
using TRINV.Shared.Business.Exceptions;

public record CreateIdentityUserCommand : IRequest<OperationResult>
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

public class CreateIdentityUserCommandHandler : IRequestHandler<CreateIdentityUserCommand, OperationResult>
{
    public async Task<OperationResult> Handle(CreateIdentityUserCommand request, CancellationToken cancellationToken)
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

            return new OperationResult().ReturnWithErrorMessage(new BadRequestException(errorResponse.detail));
        }

        var responseContent = await response.Content.ReadAsStringAsync();

        var result = JsonSerializer.Deserialize<OperationResult>(responseContent);

        ArgumentNullException.ThrowIfNull(result);

        return result;
    }
}

public record CreateIdentityUserModel(string Username, string Password, string Email);

public record ErrorResponse(int status, string detail);
