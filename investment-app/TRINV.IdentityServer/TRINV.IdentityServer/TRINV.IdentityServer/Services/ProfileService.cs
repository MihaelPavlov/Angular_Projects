using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using TRINV.IdentityServer.Data.Models;

namespace TRINV.IdentityServer.Services;

public class ProfileService : IProfileService
{
    protected UserManager<ApplicationUser> _userManager;

    public ProfileService(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        var user = _userManager.GetUserAsync(context.Subject).Result;
        var claims = _userManager.GetClaimsAsync(user).Result;
        claims.Add(new Claim(JwtClaimTypes.Email, user.Email));
        context.IssuedClaims.AddRange(claims);

        return Task.FromResult(0);
    }

    public Task IsActiveAsync(IsActiveContext context)
    {
        var user = _userManager.GetUserAsync(context.Subject).Result;

        context.IsActive = (user != null);

        return Task.FromResult(0);
    }
}
