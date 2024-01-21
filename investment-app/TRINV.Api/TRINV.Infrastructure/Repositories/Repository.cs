namespace TRINV.Infrastructure.Repositories;

using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class Repository<T> : IRepository<T>
    where T : BaseEntity
{
    readonly ApplicationDbContext _context;

    public Repository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken) =>
        await this._context.Set<T>().ToListAsync(cancellationToken);

    public async Task<IEnumerable<T>> GetAllWithPredicateAsync(Func<T, bool> predicate, CancellationToken cancellationToken) => 
        await this._context.Set<T>().Where(predicate).AsQueryable().ToListAsync(cancellationToken);
    

    public async Task<T?> GetByIdAsync(int id, CancellationToken cancellationToken) =>
        await this._context
        .Set<T>()
        .AsTracking()
        .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

    public async Task AddAsync(T entity, CancellationToken cancellationToken) =>
        await this._context.Set<T>().AddAsync(entity, cancellationToken);

    public void Update(T entity) => this._context.Set<T>().Update(entity);

    public void Delete(T entity) => this._context.Set<T>().Remove(entity);
}
