namespace TRINV.Infrastructure.Configurations;

using Domain.Entities;
using Microsoft.EntityFrameworkCore;

internal static class CommonMapping
{
    internal static void Configure(ModelBuilder builder)
    {
        builder.Entity<Investment>(entity =>
        {
            entity.Property(i => i.CreatedOn).HasDefaultValueSql("GETDATE()");
        });

        builder.Entity<NewsComment>(entity =>
        {
            entity.Property(i => i.CreatedOn).HasDefaultValueSql("GETDATE()");
        });

        builder.Entity<Notification>(entity =>
        {
            entity.Property(i => i.CreatedOn).HasDefaultValueSql("GETDATE()");
        });
    }
}