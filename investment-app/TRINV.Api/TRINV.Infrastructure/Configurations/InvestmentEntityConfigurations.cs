namespace TRINV.Infrastructure.Configurations;

using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

internal class InvestmentEntityConfigurations : IEntityTypeConfiguration<Investment>
{
    public void Configure(EntityTypeBuilder<Investment> builder)
    {
        builder
            .Property(i => i.CreatedOn)
            .HasDefaultValueSql("GETDATE()");
    }
}