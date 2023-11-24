namespace TRINV.Infrastructure.Configurations;

using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

internal class NewsCommentsEntityConfiguration : IEntityTypeConfiguration<NewsComment>
{
    public void Configure(EntityTypeBuilder<NewsComment> builder)
    {
        builder
            .Property(i => i.CreatedOn)
            .HasDefaultValueSql("GETDATE()");
    }
}