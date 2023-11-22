namespace TRINV.Infrastructure
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;

    public interface IApplicationDbContextFactory : IDbContextFactory<ApplicationDbContext>
    {
    }

    public class ApplicationDbContextFactory : IApplicationDbContextFactory
    {
        private readonly IConfiguration _connectionContext;
        public ApplicationDbContextFactory(IConfiguration connectionContext)
        {
            _connectionContext = connectionContext;
        }

        public ApplicationDbContext CreateDbContext()
        {
            var connectionString = _connectionContext.GetConnectionString("DefaultConnection") ??
                                   throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

            var optionBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionBuilder
                .UseSqlServer(connectionString)
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);

            return new ApplicationDbContext(optionBuilder.Options);
        }
    }
}
