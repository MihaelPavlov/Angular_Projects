using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TRINV.IdentityServer.Application.Infrastructure;
using TRINV.IdentityServer.Data;
using TRINV.IdentityServer.Data.Models;
using TRINV.IdentityServer.Data.Seed;
using TRINV.Shared.Business.Filters;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
#region Configuration

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

var domainSettings = builder.Configuration.GetSection(DomainSettings.SectionName).Get<DomainSettings>();
builder.Services.AddSingleton<IDomainSettings>(domainSettings);

var environmentSettings = builder.Configuration.GetSection(EnvironmentSettings.SectionName).Get<EnvironmentSettings>();
builder.Services.AddSingleton<IEnvironmentSettings>(environmentSettings);

#endregion Configuration

#region Logging

builder.Logging.ClearProviders(); // FYI Built-in logging providers: Console, Debug, EventSource, EventLog (https://learn.microsoft.com/en-us/aspnet/core/fundamentals/logging/?view=aspnetcore-7.0#built-in-logging-providers)

if (environmentSettings.IsLocal)
{
    builder.Logging.AddConsole();
}

#endregion Logging

#region Configure Services

// gates
builder.Services.AddControllersWithViews(options => options.Filters.Add<ApiExceptionFilterAttribute>());

// SQL server
var sqlMigrationsAssemblyName = typeof(Program).Assembly.FullName;

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString, sql => sql.MigrationsAssembly(sqlMigrationsAssemblyName)));

builder.Services.AddDbContextFactory<ApplicationDbContext>(lifetime: ServiceLifetime.Transient);

// asp identity
builder.Services.AddIdentity<ApplicationUser, ApplicationRole>(options => options.User.AllowedUserNameCharacters = null)
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// identity server
builder.Services.AddIdentityServer(options =>
{
    options.Events.RaiseSuccessEvents = true;
    options.Events.RaiseFailureEvents = true;
    options.Events.RaiseErrorEvents = true;
    options.Caching.ResourceStoreExpiration = TimeSpan.FromMinutes(15);
    options.Caching.ClientStoreExpiration = TimeSpan.FromMinutes(15);
    options.ServerSideSessions.RemoveExpiredSessionsFrequency = TimeSpan.FromMinutes(60);
})
    .AddServerSideSessions()
    .AddConfigurationStore(options =>
    {
        options.ConfigureDbContext = builder =>
            builder.UseSqlServer(connectionString, sql => sql.MigrationsAssembly(sqlMigrationsAssemblyName));
    })
    .AddConfigurationStoreCache()
    .AddOperationalStore(options =>
    {
        options.ConfigureDbContext = builder =>
            builder.UseSqlServer(connectionString, sql => sql.MigrationsAssembly(sqlMigrationsAssemblyName));
        options.EnableTokenCleanup = true; // by default 3600 seconds
    })
    .AddAspNetIdentity<ApplicationUser>();

builder.Services.AddAuthentication();
builder.Services.AddLocalApiAuthentication();

// other services
builder.Services.Configure<DataProtectionTokenProviderOptions>(o => o.TokenLifespan = TimeSpan.FromHours(24));
builder.Services.AddHttpContextAccessor();
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<Program>());

#endregion Configure Services

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

#region Configure Application

app.UseExceptionHandler("/Home/ServerError");
app.UseRouting();
app.UseAuthorization();
app.UseIdentityServer();
//app.UseAuthorization();
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "[TRINT] Identity Server API V1");
});
app.UseStaticFiles();

#endregion Configure Application

app.UseEndpoints(endpoints =>
{
    endpoints.MapDefaultControllerRoute().RequireAuthorization();
});

app.Logger.LogInformation("Migrate & Seed");
app.ApplyDefaultSeedConfiguration(app.Configuration);

app.Logger.LogInformation("Application is starting...");
app.Run();

