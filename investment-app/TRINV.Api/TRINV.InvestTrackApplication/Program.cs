using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.IdentityModel.Tokens;
using TRINV.Application.Handlers;
using TRINV.Application.Interfaces;
using TRINV.Application.Queries;
using TRINV.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services
    .AddAuthentication(config =>
    {
        config.DefaultScheme = "Bearer";
    })
    .AddJwtBearer("Bearer", config =>
    {
        // Works with OpenId Connect.
        config.Authority = "https://localhost:5001/";
    
        config.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false
        };
    });

builder.Services
    .AddAuthorization(config => config
        .AddPolicy("MainApi", policy => policy
            .RequireClaim("scope", "main_api")));

builder.Services.AddCors();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssembly(typeof(GetAllCurrenciesQuery).Assembly);
    cfg.RegisterServicesFromAssembly(typeof(GetAllCurrenciesHandler).Assembly);
});
builder.Services.AddScoped<IInvestmentAppDbContext>(provider => provider.GetService<InvestmentAppDbContext>()!);

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
app.UseCors(cors => cors
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod());

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints
        .MapControllers()
        .RequireAuthorization("MainApi");
});

app.Run();
