namespace TRINV.Shared.Business.Exceptions;

public class InfrastructureException: Exception
{
    /// <summary>
    /// Any communication exceptions.
    /// </summary>
    /// <param name="message"></param>
    public InfrastructureException(string message) : base(message) { }
}
