namespace TRINV.Application.Interfaces;

public interface IRepository<T>
{
    Task<IEnumerable<T>> GetAllAsync();

    Task<T?> GetByIdAsync(int id);

    void Insert(T item);

    void Update(T item);

    void Delete(T item);
}
