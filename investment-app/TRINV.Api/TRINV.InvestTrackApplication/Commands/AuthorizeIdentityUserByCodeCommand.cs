using MediatR;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using IdentityModel.Client;
using IdentityModel;

namespace TRINV.InvestTrackApplication.Commands;

public record AuthorizeIdentityUserByCodeCommand(string Code, string CodeVerifier)
    : IRequest<UserInfo?>;

internal class AuthorizeIdentityUserByCodeCommandHandler : IRequestHandler<AuthorizeIdentityUserByCodeCommand, UserInfo?>
{
    private const string ClientCallbackPath = "/oauth/callback";
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IHttpContextAccessor _contextAccessor;
    private readonly IMediator _mediator;

    public AuthorizeIdentityUserByCodeCommandHandler(IHttpClientFactory httpClientFactory, IHttpContextAccessor contextAccessor, IMediator mediator)
    {
        _httpClientFactory = httpClientFactory;
        _contextAccessor = contextAccessor;
        _mediator = mediator;
    }

    public async Task<UserInfo?> Handle(AuthorizeIdentityUserByCodeCommand request, CancellationToken cancellationToken)
    {
        var currentContext = _contextAccessor?.HttpContext;
        if (currentContext == null)
            throw new Exception("AuthorizeIdentityUserByCodeCommand HttpContext is null");

        var host = currentContext.Request.Host.Host;
        if (string.IsNullOrWhiteSpace(host))
            throw new Exception("AuthorizeIdentityUserByCodeCommand HttpContext.Request.Host is empty");

        #region discover endpoints from metadata
        var httpClient = _httpClientFactory.CreateClient("IdentityServer");
        var disco = await httpClient.GetDiscoveryDocumentAsync("https://localhost:5001", cancellationToken: cancellationToken);
        if (disco.IsError)
            throw new Exception("AuthorizeIdentityUserByCodeCommand disco error :: " + disco.Error);
        #endregion discover endpoints from metadata

        #region request token
        var redirectUri = currentContext.Request.Scheme + Uri.SchemeDelimiter + host + ClientCallbackPath;
        var tokenResponse = await httpClient.RequestAuthorizationCodeTokenAsync(new AuthorizationCodeTokenRequest
        {
            Address = disco.TokenEndpoint,
            ClientId = "WebClient_ID",
            Code = request.Code,
            CodeVerifier = request.CodeVerifier,
            RedirectUri = redirectUri
        }, cancellationToken: cancellationToken);

        if (tokenResponse.IsError)
            throw new Exception($"AuthorizeIdentityUserByCodeCommand RequestAuthorizationCodeToken error :: (uri: {redirectUri}) :: {tokenResponse.Error} :: {tokenResponse.ErrorDescription}");
        else if (string.IsNullOrWhiteSpace(tokenResponse.AccessToken))
            throw new Exception("AuthorizeIdentityUserByCodeCommand AccessToken is empty.");
        else if (string.IsNullOrWhiteSpace(tokenResponse.IdentityToken))
            throw new Exception("AuthorizeIdentityUserByCodeCommand IdentityToken is empty.");
        #endregion request token

        #region parse token
        string sub;
        string sid;
        try
        {
            var token = tokenResponse.IdentityToken;
            var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            sid = jwtToken.Claims.First(claim => claim.Type == JwtClaimTypes.SessionId).Value;
            sub = jwtToken.Claims.First(claim => claim.Type == JwtClaimTypes.Subject).Value;
        }
        catch (Exception ex)
        {
            throw new Exception("AuthorizeIdentityUserByCodeCommand something wrong with IdentityToken.", ex);
        }

        if (string.IsNullOrWhiteSpace(sub) || !int.TryParse(sub, out int userId) || string.IsNullOrWhiteSpace(sid))
            throw new Exception("AuthorizeIdentityUserByCodeCommand JwtClaimTypes.Subject claim is expected");
        if (string.IsNullOrWhiteSpace(sid))
            throw new Exception("AuthorizeIdentityUserByCodeCommand JwtClaimTypes.SessionId claim is expected");
        #endregion parse token

        #region get user information
        //var ui = await _mediator.Send(new GetUserInfoQuery(userId, host), cancellationToken);
        //if (ui == null)
        //    return null; // login process is stopped
        var ui = new UserInfo
        {
            Id = 1,
            FirstName = "Admin",
            LastName = "Admin",
            Email = "admin@trinv.com",
            Role = 0,
        };
        var claims = new List<Claim>
    {
        new Claim(JwtClaimTypes.Subject, sub),
        new Claim(JwtClaimTypes.SessionId, sid),
        new Claim(JwtClaimTypes.JwtTypes.AccessToken, tokenResponse.AccessToken),
        new Claim("Role", ui.Role.ToString())
    };

        #endregion get user information

        #region sign in

        var claimsPrincipal = new ClaimsPrincipal(new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme));

        await currentContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            claimsPrincipal,
            new AuthenticationProperties
            {
                AllowRefresh = true, // Refreshing the authentication session should be allowed.
            });
        #endregion sign in

        return ui;
    }
}

public class UserInfo
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public int Role { get; set; }
}
