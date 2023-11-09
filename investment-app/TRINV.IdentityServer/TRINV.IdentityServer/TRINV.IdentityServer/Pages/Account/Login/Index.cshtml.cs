using Duende.IdentityServer.Events;
using Duende.IdentityServer.Services;
using IdentityModel;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Security.Claims;
using TRINV.IdentityServer.Data.Models;

namespace TRINV.IdentityServer.Pages.Account.Login;

//[SecurityHeaders]
[AllowAnonymous]
public class Index : PageModel
{
    readonly ILogger<Index> _logger;
    readonly UserManager<ApplicationUser> _userManager;
    readonly SignInManager<ApplicationUser> _signInManager;
    readonly IIdentityServerInteractionService _interaction;
    readonly IEventService _events;
    readonly IMediator _mediator;

    public Index(ILogger<Index> logger, IIdentityServerInteractionService interaction, IEventService events, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IMediator mediator)
    {
        _logger = logger;
        _interaction = interaction;
        _events = events;
        _userManager = userManager;
        _signInManager = signInManager;
        _mediator = mediator;
    }

    [BindProperty]
    public InputModel Input { get; set; } = null!;

    public async Task<IActionResult> OnGet(string returnUrl, CancellationToken cancellationToken)
    {
        Input = new InputModel
        {
            ReturnUrl = returnUrl,
        };

        var context = await _interaction.GetAuthorizationContextAsync(returnUrl);

        if (context == null)
        {
            _logger.LogWarning("Unknown ReturnUrl '{ReturnUrl}'", returnUrl);
            return RedirectToPage("/Home/Error/Index");
        }

        if (context.RedirectUri.EndsWith("/oauth/callback"))
        {
            Input.ResetPasswordUrl = "/Account/ForgotPassword?ReturnUrl=" + Uri.EscapeDataString(returnUrl);
        }

        if (User?.Identity?.IsAuthenticated == true)

        {
            var sub = User.FindFirstValue(JwtClaimTypes.Subject);

            if (!string.IsNullOrEmpty(sub))
            {
                return await OnPost(cancellationToken);
            }
        }

        return Page();
    }

    public async Task<IActionResult> OnPost(CancellationToken cancellationToken)
    {
        // check if we are in the context of an authorization request
        var context = await _interaction.GetAuthorizationContextAsync(Input.ReturnUrl);

        if (ModelState.IsValid)
        {
            ApplicationUser? user;

            user = await _userManager.FindByNameAsync(Input.Username);

            if (user != null && user.AccountEnabled)
            {
                var result = await _signInManager.PasswordSignInAsync(Input.Username, Input.Password, isPersistent: true, lockoutOnFailure: true);
                if (!result.Succeeded)
                    user = null;
            }


            if (user != null)
            {
                if (!user.AccountEnabled)
                {
                    return RedirectToPage("/Account/Inactive/Index", new { confirmed = user.EmailConfirmed, returnUrl = Input.ReturnUrl });
                }

                await _events.RaiseAsync(new UserLoginSuccessEvent(user.UserName, user.Id.ToString(), user.UserName, clientId: context?.Client.ClientId));

                return Redirect(Input.ReturnUrl);
            }

            await _events.RaiseAsync(new UserLoginFailureEvent(Input.Username, "invalid credentials", clientId: context?.Client.ClientId));
            ModelState.AddModelError("Input.Password", "Invalid user credentials. Please verify them and try again.");
            ModelState.AddModelError("Input.Username", " ");
        }

        return Page();
    }
}
