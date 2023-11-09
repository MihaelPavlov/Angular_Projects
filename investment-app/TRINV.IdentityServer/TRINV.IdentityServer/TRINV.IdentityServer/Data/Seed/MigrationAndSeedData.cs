using Duende.IdentityServer.EntityFramework.DbContexts;
using Duende.IdentityServer.EntityFramework.Mappers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TRINV.IdentityServer.Application.Infrastructure;
using TRINV.IdentityServer.Data.Models;

namespace TRINV.IdentityServer.Data.Seed;

public static class MigrationAndSeedData
{
    /// <summary>
    /// Applies default seed configuration during application startup, ensuring database migrations and seeding for persisted grants, configuration, and user data.
    /// </summary>
    public static void ApplyDefaultSeedConfiguration(this IApplicationBuilder app, IConfiguration configuration)
    {
        using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
        {
            var domainSettings = configuration.GetSection(DomainSettings.SectionName).Get<DomainSettings>();
            var environmentSettings = configuration.GetSection(EnvironmentSettings.SectionName).Get<EnvironmentSettings>();

            using (var context = scope.ServiceProvider.GetService<PersistedGrantDbContext>())
            {
                ArgumentNullException.ThrowIfNull(context);

                context.Database.Migrate();
            }

            using (var context = scope.ServiceProvider.GetService<ConfigurationDbContext>())
            {
                ArgumentNullException.ThrowIfNull(context);

                context.Database.Migrate();

                var logger = scope.ServiceProvider.GetService<ILogger<ConfigurationDbContext>>() 
                    ?? throw new ArgumentNullException();

                EnsureConfigurationSeedData(context, logger);
            }

            using (var context = scope.ServiceProvider.GetService<ApplicationDbContext>())
            {
                ArgumentNullException.ThrowIfNull(context);

                context.Database.Migrate();

                var logger = scope.ServiceProvider.GetService<ILogger<ApplicationDbContext>>()
                    ?? throw new ArgumentNullException();

                EnsureUsersSeedData(context, logger, scope, environmentSettings);
            }
        }
    }

    /// <summary>
    /// Ensures essential configuration data is seeded in the database, including clients, identity resources, and API scopes, promoting application functionality.
    /// </summary>
    private static void EnsureConfigurationSeedData(ConfigurationDbContext context, ILogger logger)
    {
        if (!context.Clients.Any())
        {
            var clients = PredefinedClients.GetClients();
            logger.LogInformation("Seed {0} clients", clients.Count);

            foreach (var seedClient in clients)
                context.Clients.Add(seedClient.ToEntity());

            context.SaveChanges();
        }

        if (!context.IdentityResources.Any())
        {
            var identityResources = PredefinedIdentities.IdentityResources;
            logger.LogInformation("Seed {0} identityResources", identityResources.Count);

            foreach (var resource in identityResources)
                context.IdentityResources.Add(resource.ToEntity());

            context.SaveChanges();
        }

        if (!context.ApiScopes.Any())
        {
            var apiScopes = PredefinedScopes.ApiScopes;
            logger.LogInformation("Seed {0} apiScopes", apiScopes.Count);

            foreach (var seedScope in apiScopes)
                context.ApiScopes.Add(seedScope.ToEntity());

            context.SaveChanges();
        }
    }

    /// <summary>
    /// Ensures user seed data is added to the application database, creating users with specified attributes and claims for initial configuration.
    /// </summary>
    private static void EnsureUsersSeedData(ApplicationDbContext context, ILogger logger, IServiceScope scope, IEnvironmentSettings environment)
    {
        if (context.Users.Any())
            return;

        var userMgr = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        var seedUsers = PredefinedUsers.GetUsers(environment);
        logger.LogInformation("Seed {0} users", seedUsers.Count);

        foreach (var seedUser in seedUsers)
        {
            var user = new ApplicationUser
            {
                Id = seedUser.Id,
                UserName = seedUser.UserName,
                Email = seedUser.Email,
                EmailConfirmed = seedUser.EmailConfirmed,
                AccountEnabled = seedUser.AccountEnabled
            };

            var result = userMgr.CreateAsync(user, seedUser.Password).Result;
            if (!result.Succeeded)
            {
                throw new Exception(string.Join(" ", result.Errors.Select(x => x.Description)));
            }

            result = userMgr.AddClaimsAsync(user, seedUser.Claims).Result;
            if (!result.Succeeded)
            {
                throw new Exception(string.Join(" ", result.Errors.Select(x => x.Description)));
            }
        }
    }
}
