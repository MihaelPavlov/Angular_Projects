namespace TRINV.Application.Interfaces;

public interface IRepository<T>
{
    Task<IEnumerable<T>> GetAllAsync();

    Task<T?> GetByIdAsync(int id);

    void Insert(T entity);

    void Update(T entity);

    void Delete(T entity);
}
