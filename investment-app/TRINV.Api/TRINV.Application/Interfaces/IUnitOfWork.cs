namespace TRINV.Application.Interfaces;

public interface IUnitOfWork
{
    Task SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken());
}
