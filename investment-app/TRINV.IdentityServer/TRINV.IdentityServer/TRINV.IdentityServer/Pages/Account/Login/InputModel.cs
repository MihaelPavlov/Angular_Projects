using System.ComponentModel.DataAnnotations;

namespace TRINV.IdentityServer.Pages.Account.Login;

public class InputModel
{
    [Required(ErrorMessage = "Field is required")]
    [RegularExpression("^[^@]+@{1}[^@\\.]+\\.[^@\\.]+[^@]*$", ErrorMessage = "Please enter a valid email address")]
    public string Username { get; set; } = string.Empty;

    [Required(ErrorMessage = "Field is required")]
    public string Password { get; set; } = string.Empty;
    public bool IsExtrenalLogin { get; set; } = false;
    public string ReturnUrl { get; set; } = string.Empty;
    public string ResetPasswordUrl { get; set; } = string.Empty;
}
