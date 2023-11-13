namespace TRINV.Shared.Business.Exceptions;

public class NotFoundException : Exception
{
    public NotFoundException(string message)
    : base(message)
    {
    }

    public NotFoundException(string message, Exception innerException)
        : base(message, innerException)
    {
    }

    public NotFoundException(string entityName, object key)
        : base($"Entity \"{entityName}\" ({key}) was not found.")
    {
    }

    public NotFoundException(Type entityType, object key)
        : base($"Entity \"{entityType.Name}\" ({key}) was not found.")
    {
    }
}
