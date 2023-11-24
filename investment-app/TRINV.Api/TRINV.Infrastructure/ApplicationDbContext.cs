namespace TRINV.Infrastructure;

using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using Configurations;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext() { }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Investment> Investments { get; set; }

    public DbSet<GlobalSetting> GlobalSettings { get; set; }

    public DbSet<News> News { get; set; }

    public DbSet<NewsComment> NewsComments { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        Assembly configAssembly = Assembly.GetAssembly(typeof(InvestmentEntityConfigurations)) ??
                                  Assembly.GetExecutingAssembly();

        builder.ApplyConfigurationsFromAssembly(configAssembly);

        base.OnModelCreating(builder);
    }
}

