using Microsoft.IdentityModel.Tokens;
using TRINV.Infrastructure.Configurations;
using TRINV.Shared.Business.Filters;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddInfrastructure(builder.Configuration);

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
builder.Services.AddControllers(options => options.Filters.Add(typeof(ApiExceptionFilterAttribute)));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<Program>());

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
