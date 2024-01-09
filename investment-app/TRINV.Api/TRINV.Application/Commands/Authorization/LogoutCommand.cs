using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;

namespace TRINV.Application.Commands.Authorization;

public record LogoutCommand : IRequest;

internal class LogoutCommandHandler : IRequestHandler<LogoutCommand>
{
    readonly IHttpContextAccessor _contextAccessor;

    public LogoutCommandHandler(IHttpContextAccessor contextAccessor)
    {
        _contextAccessor = contextAccessor;
    }

    public async Task Handle(LogoutCommand request, CancellationToken cancellationToken)
    {
        // Clear the existing external cookie
        await this._contextAccessor.HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        var client = new HttpClient();
        var result = await client.GetAsync("https://localhost:5001/account/logout", cancellationToken);

        if (!result.IsSuccessStatusCode)
            throw new Exception(result.ToString());
    }
}
