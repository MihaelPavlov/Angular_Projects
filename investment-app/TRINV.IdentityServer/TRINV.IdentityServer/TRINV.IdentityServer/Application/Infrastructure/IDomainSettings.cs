namespace TRINV.IdentityServer.Application.Infrastructure;

public interface IDomainSettings
{
    string Name { get; }
}

public class DomainSettings : IDomainSettings
{
    public static readonly string SectionName = "Domain";

    public string Name { get; set; } = string.Empty;
}

