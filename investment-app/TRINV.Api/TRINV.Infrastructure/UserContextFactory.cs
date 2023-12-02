using IdentityModel;
using Microsoft.AspNetCore.Http;
using TRINV.Application.Interfaces;
using System.Security.Claims;

namespace TRINV.Infrastructure;

public class UserContextFactory : IUserContextFactory
{
    readonly IHttpContextAccessor _httpContextAccessor;
    IUserContext _defaultUserContext;

    public UserContextFactory(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
        _defaultUserContext = new UserContext(null);
    }

    public IUserContext CreateUserContext()
    {
        if (_httpContextAccessor.HttpContext == null)
            return _defaultUserContext;

        var user = _httpContextAccessor.HttpContext.User;

        var userIdparsed = int.TryParse(user.FindFirstValue(JwtClaimTypes.Subject), out int userId);


        return new UserContext(userId: userIdparsed ? userId : null);
    }
}

public static class PrincipalExtensions
{
    /// <summary>
    /// Returns the value for the first claim of the specified type, otherwise null if the claim is not present.
    /// </summary>
    /// <param name="principal">The <see cref="ClaimsPrincipal"/> instance this method extends.</param>
    /// <param name="claimType">The claim type whose first value should be returned.</param>
    /// <returns>The value of the first instance of the specified claim type, or null if the claim is not present.</returns>
    public static string FindFirstValue(this ClaimsPrincipal principal, string claimType)
    {
        if (principal == null)
        {
            throw new ArgumentNullException(nameof(principal));
        }
        var claim = principal.FindFirst(claimType);
        return claim != null ? claim.Value : null;
    }

}
