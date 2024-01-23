namespace TRINV.Infrastructure;

using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Configurations;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Investment> Investments { get; set; }

    public DbSet<GlobalSetting> GlobalSettings { get; set; }

    public DbSet<News> News { get; set; }

    public DbSet<NewsComment> NewsComments { get; set; }

    public DbSet<Currency> Currencies { get; set; }

    public DbSet<Notification> Notifications { get; set; }

    public DbSet<UserNotification> UserNotifications { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        CommonMapping.Configure(builder);

        base.OnModelCreating(builder);
    }
}