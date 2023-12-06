namespace TRINV.Infrastructure.Repositories;

using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class Repository<T> : IRepository<T>
    where T : BaseEntity
{
    private readonly ApplicationDbContext _context;

    public Repository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _context.Set<T>().ToListAsync(cancellationToken);
    }

    public async Task<T?> GetByIdAsync(int id, CancellationToken cancellationToken)
    {
        return await _context.Set<T>().FindAsync(id, cancellationToken);
    }

    public async Task Insert(T entity, CancellationToken cancellationToken)
    {
         await _context.Set<T>().AddAsync(entity, cancellationToken);
    }

    public void Update(T entity)
    {
        _context.Set<T>().Update(entity);
    }

    public void Delete(T entity)
    {
        _context.Set<T>().Remove(entity);
    }
}