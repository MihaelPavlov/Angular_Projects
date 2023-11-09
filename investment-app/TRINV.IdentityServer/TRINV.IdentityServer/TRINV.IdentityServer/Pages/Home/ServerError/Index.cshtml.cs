using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace TRINV.IdentityServer.Pages.Home.ServerError;

[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
[AllowAnonymous]
[SecurityHeaders]
public class Index : PageModel
{
    public string ExceptionMessage { get; set; } = "Unknown server error";

}
