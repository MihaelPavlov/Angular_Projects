using IdentityModel.Client;
using MediatR;
using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace TRINV.Application.Commands.Authorization;

public record AuthorizeByCodeCommand(string Code, string CodeVerifier) : IRequest<object>;

internal class AuthorizeByCodeCommandHandler : IRequestHandler<AuthorizeByCodeCommand, object>
{
    readonly IHttpContextAccessor _contextAccessor;
    
    public AuthorizeByCodeCommandHandler(IHttpContextAccessor contextAccessor)
    {
        _contextAccessor = contextAccessor;
    }

    public async Task<object> Handle(AuthorizeByCodeCommand request, CancellationToken cancellationToken)
    {
        // discover endpoints from metadata
        var client = new HttpClient();
        var disco = await client.GetDiscoveryDocumentAsync("https://localhost:5001");
        if (disco.IsError)
            throw new Exception("Discovery document not found!");

        // request token
        var tokenResponse = await client.RequestAuthorizationCodeTokenAsync(new AuthorizationCodeTokenRequest
        {
            Address = disco.TokenEndpoint,
            ClientId = "WebClient_ID",
            Code = request.Code,
            CodeVerifier = request.CodeVerifier,
            RedirectUri = "http://localhost:4200/sign-in-callback"
        });

        if (tokenResponse.IsError)
            throw new Exception(tokenResponse.Error + " :: " + tokenResponse.ErrorDescription);

        ArgumentNullException.ThrowIfNull(tokenResponse.AccessToken);

        // request user info
        var apiClient = new HttpClient();
        apiClient.SetBearerToken(tokenResponse.AccessToken);

        var response = await apiClient.GetAsync(disco.UserInfoEndpoint);
        
        if (!response.IsSuccessStatusCode)
            throw new Exception(response.ToString());

        _contextAccessor.HttpContext.Session.SetString("AccessToken", tokenResponse.AccessToken);
        //HttpContext.Session.SetString("RefreshToken", tokenResponse.RefreshToken);

        var content = await response.Content.ReadAsStringAsync();
        var parsed = JsonDocument.Parse(content);
        var sub = string.Empty;
        var email = string.Empty;
        var role = string.Empty;
        foreach (var el in parsed.RootElement.EnumerateObject())
        {
            var name = el.Name;
            var value = el.Value.GetString() ?? "";
            _contextAccessor.HttpContext.Session.SetString(name, value);

            if (name == "sub" && !string.IsNullOrWhiteSpace(value))
                sub = value;

            if (name == "email" && !string.IsNullOrWhiteSpace(value))
                email = value;

            if (name == "Role" && !string.IsNullOrWhiteSpace(value))
                role = value;
        }

        // sign in
        var claims = new List<Claim>
        {
            new Claim("sub", sub),
            new Claim("scope","main_api"),
            new Claim("email",email),
            new Claim("role",role)
        };

        var claimsPrincipal = new ClaimsPrincipal(
            new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme));

        var authProperties = new AuthenticationProperties
        {
            AllowRefresh = true,
            // Refreshing the authentication session should be allowed.

            //ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
            // The time at which the authentication ticket expires. A 
            // value set here overrides the ExpireTimeSpan option of 
            // CookieAuthenticationOptions set with AddCookie.

            //IsPersistent = true,
            // Whether the authentication session is persisted across 
            // multiple requests. When used with cookies, controls
            // whether the cookie's lifetime is absolute (matching the
            // lifetime of the authentication ticket) or session-based.

            //IssuedUtc = <DateTimeOffset>,
            // The time at which the authentication ticket was issued.

            //RedirectUri = <string>
            // The full path or absolute URI to be used as an http 
            // redirect response value.
        };

        await _contextAccessor.HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            claimsPrincipal,
            authProperties);

        var result = parsed.Deserialize<object>();

        ArgumentNullException.ThrowIfNull(result);

        return result;
    }
}
