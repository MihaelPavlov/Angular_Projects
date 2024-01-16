namespace TRINV.Shared.Business.Logger;

public interface ILoggerService
{
    LogEventLevel MinimumLogLevel { get; }

    /// <summary>
    /// Logs a message with a given <see cref="LogEventLevel"/>.
    /// </summary>
    /// <param name="level">The <see cref="LogEventLevel"/> of the log entry.</param>
    /// <param name="message">The message to log.</param>
    void Log(LogEventLevel level, string message);

    void Debug(string message);

    Task EmitAllLogsAsync(CancellationToken cancellationToken);
}
