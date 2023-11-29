﻿namespace TRINV.Infrastructure.Configurations;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Application.Interfaces;
using Repositories;

public static class DI
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection") ??
                                 throw new InvalidOperationException("Connection string 'DefaultConnection' not found.")));

        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

        return services;
    }
}