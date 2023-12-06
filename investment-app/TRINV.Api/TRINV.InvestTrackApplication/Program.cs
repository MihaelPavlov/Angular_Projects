using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.IdentityModel.Tokens;
using TRINV.Application.Interfaces;
using TRINV.Application.Queries;
using TRINV.Infrastructure;
using TRINV.Infrastructure.Configurations;
using TRINV.InvestTrackApplication.Middleware;
using TRINV.Shared.Business.Filters;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options => options.Filters.Add(typeof(ApiExceptionFilterAttribute)));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUserContextFactory, UserContextFactory>();
builder.Services.AddScoped<IUserContext>(services => services.GetRequiredService<IUserContextFactory>().CreateUserContext());
// Add services to the container.
builder.Services.AddInfrastructure(builder.Configuration);

builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.HttpOnly = true;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.Cookie.SameSite = SameSiteMode.None;
        options.Cookie.Name = ".Angular.Authentication";
        options.ExpireTimeSpan = TimeSpan.FromHours(8);
        options.SlidingExpiration = true;
    });

builder.Services.AddAuthorization(options =>
    options.AddPolicy("ApiScope", policy =>
    {
        policy.RequireAuthenticatedUser();
        policy.RequireClaim("sub");
        policy.RequireClaim("scope", new string[] { "main_api" });
        policy.RequireClaim("email");
    })
);

//builder.Services
//    .AddAuthorization(config => config
//        .AddPolicy("MainApi", policy => policy
//            .RequireClaim("scope", "main_api")));


builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetAllCurrenciesQuery).Assembly));

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromHours(8);
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.Name = ".Angular.Session";
    options.Cookie.IsEssential = true;
});

builder.Services.AddHttpClient();
builder.Services.AddHttpContextAccessor();
builder.Services.AddCors(options =>
{
    options.AddPolicy("WebClient_ID", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "[TRINT] Invest Track API V1");
    });
}

app.UseHttpsRedirection();
app.UseCors("WebClient_ID");

app.UseRouting();
app.UseAuthentication();
app.UseSession();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints
        .MapControllers()
        .RequireAuthorization("ApiScope");
});
app.UseMiddleware<CustomTokenValidatorMiddleware>();

app.Run();
