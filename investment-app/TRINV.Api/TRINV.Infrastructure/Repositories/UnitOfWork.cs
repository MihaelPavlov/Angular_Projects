namespace TRINV.Infrastructure.Repositories;

using Application.Interfaces;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        await _context.SaveChangesAsync(cancellationToken);
    }
}
