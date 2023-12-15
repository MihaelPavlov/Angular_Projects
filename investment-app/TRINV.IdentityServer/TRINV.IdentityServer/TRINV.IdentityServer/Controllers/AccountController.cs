using Duende.IdentityServer;
using Duende.IdentityServer.Events;
using Duende.IdentityServer.Extensions;
using Duende.IdentityServer.Services;
using IdentityModel;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TRINV.IdentityServer.Data.Models;
using TRINV.IdentityServer.Models;

namespace TRINV.IdentityServer.Controllers;

[AllowAnonymous]
public class AccountController : Controller
{
    readonly SignInManager<ApplicationUser> signInManager;
    readonly UserManager<ApplicationUser> userManager;
    readonly IIdentityServerInteractionService interaction;
    readonly IEventService events;

    public AccountController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
         IIdentityServerInteractionService interaction,
        IEventService events)
    {
        this.signInManager = signInManager;
        this.userManager = userManager;
        this.interaction = interaction;
        this.events = events;
    }

    [HttpGet]
    public async Task<IActionResult> Login(string returnUrl)
    {
        var context = await interaction.GetAuthorizationContextAsync(returnUrl);
        if (context?.Client != null)
        {
            return View(new LoginViewModel { ReturnUrl = returnUrl });
        }

        return Redirect("/Home/Error");
    }

    [HttpPost]
    public async Task<IActionResult> Login(LoginViewModel model)
    {
        var context = await interaction.GetAuthorizationContextAsync(model.ReturnUrl);
        if (ModelState.IsValid)
        {
            var userToSignIn = await signInManager.UserManager.FindByEmailAsync(model.Email);
            var resultFromSignIn = await signInManager.PasswordSignInAsync(userToSignIn.UserName, model.Password, false, lockoutOnFailure: false);

            if (resultFromSignIn.Succeeded)
            {
                var user = await userManager.FindByNameAsync(userToSignIn.UserName);
                await events.RaiseAsync(new UserLoginSuccessEvent(user.UserName, user.Id.ToString(), user.UserName, clientId: context?.Client.ClientId));

                // issue authentication cookie with subject ID and username
                var isuser = new IdentityServerUser(user.Id.ToString())
                {
                    DisplayName = user.UserName
                };

                await HttpContext.SignInAsync(isuser);

                if (context != null)
                {
                    // we can trust model.ReturnUrl since GetAuthorizationContextAsync returned non-null
                    return Redirect(model.ReturnUrl);
                }

                // request for a local page
                if (Url.IsLocalUrl(model.ReturnUrl))
                {
                    return Redirect(model.ReturnUrl);
                }
                else if (string.IsNullOrEmpty(model.ReturnUrl))
                {
                    return Redirect("~/");
                }
                else
                {
                    // user might have clicked on a malicious link - should be logged
                    throw new Exception("invalid return URL");
                }
            }

        }

        await events.RaiseAsync(new UserLoginFailureEvent(model.Email, "invalid credentials", clientId: context?.Client.ClientId));
        ModelState.AddModelError(string.Empty, "Invalid username or password");

        return View(model);
    }

    [HttpGet]
    public IActionResult Register(string returnUrl)
        => View(new RegisterViewModel { ReturnUrl = returnUrl });

    [HttpPost]
    public async Task<IActionResult> Register(RegisterViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        var user = new ApplicationUser
        {
            UserName = model.Username,
        };

        var result = await this.userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            await this.signInManager.SignInAsync(user, false);

            return Redirect(model.ReturnUrl);
        }

        return View();
    }

    [HttpGet]
    public IActionResult Logout(string returnUrl)
    {
        var model = new LogoutViewModel();
        model.ReturnUrl = returnUrl ?? "/Account/Logout/LoggedOut";

        return View(model);
    }

    [HttpPost]
    public async Task<IActionResult> Logout(LogoutViewModel model)
    {
        if (this.User?.Identity?.IsAuthenticated == true)
        {
            // if there's no current logout context, we need to create one
            // this captures necessary info from the current logged in user
            // this can still return null if there is no context needed
            model.LogoutId ??= await interaction.CreateLogoutContextAsync();

            // delete local authentication cookie
            await signInManager.SignOutAsync();

            // raise the logout event
            await events.RaiseAsync(new UserLogoutSuccessEvent(User.GetSubjectId(), User.GetDisplayName()));

            // see if we need to trigger federated logout
            var idp = User.FindFirst(JwtClaimTypes.IdentityProvider)?.Value;

            // if it's a local login we can ignore this workflow
            if (idp != null && idp != IdentityServerConstants.LocalIdentityProvider)
            {
                // we need to see if the provider supports external logout
                if (await HttpContext.GetSchemeSupportsSignOutAsync(idp))
                {
                    // build a return URL so the upstream provider will redirect back
                    // to us after the user has logged out. this allows us to then
                    // complete our single sign-out processing.
                    string url = Url.Page("/Account/Logout/Loggedout", new { logoutId = model.LogoutId });

                    // this triggers a redirect to the external provider for sign-out
                    return SignOut(new AuthenticationProperties { RedirectUri = url }, idp);
                }
            }
        }

        return RedirectToAction("LoggedOut", new { logoutId = model.LogoutId });
    }

    [HttpGet]
    public async Task<IActionResult> LoggedOut(string logoutId)
    {
        var logout = await interaction.GetLogoutContextAsync(logoutId);

        var model = new LoggedOutViewModel
        {
            AutomaticRedirectAfterSignOut = false,
            PostLogoutRedirectUri = logout?.PostLogoutRedirectUri,
            ClientName = String.IsNullOrEmpty(logout?.ClientName) ? logout?.ClientId : logout?.ClientName,
            SignOutIframeUrl = logout?.SignOutIFrameUrl
        };
        return View(model.PostLogoutRedirectUri);
    }

    [HttpGet]
    public IActionResult AccessDenied()
    {
        return View();
    }
}