namespace TRINV.Application.Interfaces;

using Domain.Entities;

public interface IRepository<T> where T : BaseEntity
{
    Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken);

    Task<IEnumerable<T>> GetAllWithPredicateAsync(Func<T, bool> predicate, CancellationToken cancellationToken);

    Task<T?> GetByIdAsync(int id, CancellationToken cancellationToken);

    Task AddAsync(T entity, CancellationToken cancellationToken);

    void Update(T entity);

    void Delete(T entity);
}
