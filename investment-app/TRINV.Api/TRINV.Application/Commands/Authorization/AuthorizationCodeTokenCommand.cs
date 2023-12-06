using IdentityModel.Client;
using MediatR;
using System.Text.Json;
using TRINV.Shared.Business.Exceptions;

namespace TRINV.Application.Commands.Authorization;

public record AuthorizationCodeTokenCommand(string Code, string codeVerifier) : IRequest<AuthorizationCodeTokenModel>;

internal class AuthorizationCodeTokenCommandHandler : IRequestHandler<AuthorizationCodeTokenCommand, AuthorizationCodeTokenModel>
{
    public async Task<AuthorizationCodeTokenModel> Handle(AuthorizationCodeTokenCommand request, CancellationToken cancellationToken)
    {
        // discover endpoints from metadata
        var client = new HttpClient();
        var disco = await client.GetDiscoveryDocumentAsync("https://localhost:5001", cancellationToken);
        if (disco.IsError)
            throw new BadRequestException("Discovery document not found!");

        // request token
        var tokenResponse = await client.RequestAuthorizationCodeTokenAsync(new AuthorizationCodeTokenRequest
        {
            GrantType = "authorization_code",
            Address = disco.TokenEndpoint,
            ClientId = "WebClient_ID",
            Code = request.Code,
            CodeVerifier = request.codeVerifier,
            RedirectUri = "http://localhost:4200/sign-in-callback"
        }, cancellationToken);

        if (tokenResponse.IsError)
            throw new BadRequestException(tokenResponse.Error + " :: " + tokenResponse.ErrorDescription);

        ArgumentNullException.ThrowIfNull(tokenResponse.AccessToken);

        // request user info
        var apiClient = new HttpClient();
        apiClient.SetBearerToken(tokenResponse.AccessToken);

        var response = await apiClient.GetAsync(disco.UserInfoEndpoint, cancellationToken);
        if (!response.IsSuccessStatusCode)
            throw new BadRequestException(response.ToString());

        var content = await response.Content.ReadAsStringAsync(cancellationToken);
        var parsed = JsonDocument.Parse(content);

        var userResponse = parsed.Deserialize<object>();
        /*
          "userResponse": {
            "sub": "1",
            "preferred_username": "admin@trinv.com",
            "name": "admin@trinv.com"
          }
         */

        return new AuthorizationCodeTokenModel
        {
            TokenResponse = new TokenResponseModel(
                tokenResponse.IdentityToken,
                tokenResponse.AccessToken,
                tokenResponse.RefreshToken,
                tokenResponse.ExpiresIn),
            UserResponse = userResponse
        };
    }
}

public class AuthorizationCodeTokenModel
{
    public TokenResponseModel TokenResponse { get; set; } = null!;
    public object? UserResponse { get; set; } = null!;
}

public record TokenResponseModel(string? IdentityToken, string AccessToken, string? RefreshToken, int ExpiresIn);
