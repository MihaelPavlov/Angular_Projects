namespace TRINV.IdentityServer.Application.Infrastructure;

public interface IEnvironmentSettings
{
    string Name { get; }
    IAdmin SuperAdmin { get; }
    bool IsLocal { get; }
}

public interface IAdmin
{
    string Email { get; }
    string Password { get; }
}

public class EnvironmentSettings : IEnvironmentSettings
{
    public static readonly string SectionName = "Environment";

    const string LOCAL_ENVIRONMENT = "local";

    public string Name { get; set; } = string.Empty;

    public HBRAdmin Admin { get; set; } = null!;

    public IAdmin SuperAdmin => this.Admin;
    public bool IsLocal => Name == LOCAL_ENVIRONMENT;
}

public class HBRAdmin : IAdmin
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}