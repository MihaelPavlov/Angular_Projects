namespace TRINV.Infrastructure.Configurations;

using Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

public static class DI
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IApplicationDbContextFactory, ApplicationDbContextFactory>();

        return services;
    }
}
