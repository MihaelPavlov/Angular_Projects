namespace TRINV.InvestTrackApplication.Controllers;

using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Commands;
using IdentityModel.Client;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    readonly IMediator _mediator;
    readonly ILogger<AccountController> _logger;
    readonly IHttpContextAccessor _contextAccessor;

    public AccountController(IMediator mediator, ILogger<AccountController> logger, IHttpContextAccessor contextAccessor)
    {
        _mediator = mediator;
        _logger = logger;
        _contextAccessor = contextAccessor;
    }

    [AllowAnonymous]
    [HttpGet]
    [Route("token")]
    public async Task<IActionResult> AuthorizationCodeToken([FromHeader(Name = "code")] string code, [FromHeader(Name = "code_verifier")] string codeVerifier)
    {
        // discover endpoints from metadata
        var client = new HttpClient();
        var disco = await client.GetDiscoveryDocumentAsync("https://localhost:5001");
        if (disco.IsError)
        {
            return Problem(disco.Error);
        }

        // request token
        var tokenResponse = await client.RequestAuthorizationCodeTokenAsync(new AuthorizationCodeTokenRequest
        {
            GrantType = "authorization_code",
            Address = disco.TokenEndpoint,
            ClientId = "WebClient_ID",
            Code = code,
            CodeVerifier = codeVerifier,
            RedirectUri = "http://localhost:4200/sign-in-callback"
        });

        if (tokenResponse.IsError)
        {
            return Problem(tokenResponse.Error + " :: " + tokenResponse.ErrorDescription);
        }

        // request user info
        var apiClient = new HttpClient();
        apiClient.SetBearerToken(tokenResponse.AccessToken);

        var response = await apiClient.GetAsync(disco.UserInfoEndpoint);
        if (!response.IsSuccessStatusCode)
        {
            return Problem(response.ToString(), statusCode: (int)response.StatusCode);
        }

        var content = await response.Content.ReadAsStringAsync();
        var parsed = JsonDocument.Parse(content);
        var userResponse = parsed.Deserialize<object>();

        return new JsonResult(new
        {
            tokenResponse = new { tokenResponse.IdentityToken, tokenResponse.AccessToken, tokenResponse.RefreshToken, tokenResponse.ExpiresIn },
            userResponse = userResponse
        });
    }

    [AllowAnonymous]
    [HttpGet]
    [Route("authorize")]
    public async Task<IActionResult> AuthorizeByCode([FromHeader(Name = "code")] string code, [FromHeader(Name = "code_verifier")] string codeVerifier)
    {
        // discover endpoints from metadata
        var client = new HttpClient();
        var disco = await client.GetDiscoveryDocumentAsync("https://localhost:5001");
        if (disco.IsError)
        {
            return Problem(disco.Error);
        }

        // request token
        var tokenResponse = await client.RequestAuthorizationCodeTokenAsync(new AuthorizationCodeTokenRequest
        {
            Address = disco.TokenEndpoint,
            ClientId = "WebClient_ID",
            Code = code,
            CodeVerifier = codeVerifier,
            RedirectUri = "http://localhost:4200/sign-in-callback"
        });

        if (tokenResponse.IsError)
        {
            return Problem(tokenResponse.Error + " :: " + tokenResponse.ErrorDescription);
        }

        // request user info
        var apiClient = new HttpClient();
        apiClient.SetBearerToken(tokenResponse.AccessToken);

        var response = await apiClient.GetAsync(disco.UserInfoEndpoint);
        if (!response.IsSuccessStatusCode)
        {
            return Problem(response.ToString(), statusCode: (int)response.StatusCode);
        }

        HttpContext.Session.SetString("AccessToken", tokenResponse.AccessToken);
        //HttpContext.Session.SetString("RefreshToken", tokenResponse.RefreshToken);

        var content = await response.Content.ReadAsStringAsync();
        var parsed = JsonDocument.Parse(content);
        var sub = string.Empty;
        foreach (var el in parsed.RootElement.EnumerateObject())
        {
            var name = el.Name;
            var value = el.Value.GetString() ?? "";
            HttpContext.Session.SetString(name, value);

            if (name == "sub" && !string.IsNullOrWhiteSpace(value))
                sub = value;
        }

        // sign in
        var claims = new List<Claim>
        {
            new Claim("sub", sub),
            new Claim("scope","main_api"),
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

        await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            claimsPrincipal,
            authProperties);

        return new JsonResult(parsed.Deserialize<object>()); // just as na example
    }

    [AllowAnonymous]
    [HttpGet]
    [Route("anonymous")]
    public IActionResult Anonymous()
    {
        return new JsonResult(new { success = "anonymous" });
    }

    [HttpGet]
    [Route("signout")]
    public async Task Logout()
    {
        // Clear the existing external cookie
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    }

    [HttpGet]
    [Authorize(Policy = "ApiScope")]
    [Route("user-info")]
    public IActionResult UserInformation()
    {
        //try
        //{
        //    var host = _contextAccessor.HttpContext?.Request.Host.Host;
        //    if (string.IsNullOrEmpty(host))
        //        return Forbid();

        //    var userInfo = new UserInfo
        //    {
        //        Id = 1,
        //        FirstName = "Admin",
        //        LastName = "Admin",
        //        Email = "admin@trinv.com",
        //        Role = 0,
        //    };

        //    return Ok(userInfo);
        //}
        //catch (Exception ex)
        //{
        //    _logger.LogError(ex, "UserInfo error");
        //    return Problem("Server error, cannot extract user");
        //}

        var subFromClaim = User.FindFirstValue("sub");
        var subFromSession = HttpContext.Session.GetString("sub");
        return new JsonResult(new { success = "userinfo", subFromClaim, subFromSession });
    }
}
