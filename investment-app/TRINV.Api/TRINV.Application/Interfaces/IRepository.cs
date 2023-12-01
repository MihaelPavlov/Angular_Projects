namespace TRINV.Application.Interfaces;

using Domain.Entities;

public interface IRepository<T> where T : BaseEntity
{
    Task<IEnumerable<T>> GetAllAsync();

    Task<T?> GetByIdAsync(int id);

    Task Insert(T entity);

    void Update(T entity);

    void Delete(T entity);
}
