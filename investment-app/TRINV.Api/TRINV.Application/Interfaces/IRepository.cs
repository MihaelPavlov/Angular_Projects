namespace TRINV.Application.Interfaces;

using Domain.Entities;

public interface IRepository<T> where T : BaseEntity
{
    Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken);

    Task<T?> GetByIdAsync(int id, CancellationToken cancellationToken);

    Task Insert(T entity, CancellationToken cancellationToken);

    void Update(T entity, CancellationToken cancellationToken);

    void Delete(T entity, CancellationToken cancellationToken);
}
