namespace TRINV.Infrastructure.Interfaces;

using Microsoft.EntityFrameworkCore;

public interface IApplicationDbContextFactory : IDbContextFactory<ApplicationDbContext>
{
}