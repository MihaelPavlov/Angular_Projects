namespace TRINV.Infrastructure;

using Domain.Entities;
using Microsoft.EntityFrameworkCore;
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
        CommonMapping.Configure(builder);

        base.OnModelCreating(builder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
#if DEBUG
        if (!builder.IsConfigured)
        {
            builder.UseSqlServer(@"Server=(local);Database=InvestTrackerDb;Trusted_Connection=True;TrustServerCertificate=True");
        }
#endif
    }
}
