using TRINV.Shared.Business.Helpers.OutputHelper;

namespace TRINV.Shared.Business.Logger;

/// <summary>
/// Custom implementation of <see cref="ILoggerService"/>.
/// </summary>
public class LoggerService : ILoggerService
{
    public LoggerService(IOutputHelper outputHelper)
    {
        this.OutputHelper = outputHelper;
    }

    /// <inheritdoc />
    public IOutputHelper OutputHelper { get; } = null!;

    /// <inheritdoc />
    public LogEventLevel MinimumLogLevel => throw new NotImplementedException();

    /// <inheritdoc />
    public void Debug(string message) => this.Log(LogEventLevel.Information, message);

    /// <inheritdoc />
    public Task EmitAllLogsAsync(CancellationToken cancellationToken) => throw new NotImplementedException();

    /// <inheritdoc />
    public void Log(LogEventLevel level, string message)
    {
        if (this.OutputHelper is null) return;

        ConsoleColor color;

        switch (level)
        {
            case LogEventLevel.Verbose:
                color = ConsoleColor.Blue;
                break;
            case LogEventLevel.Debug:
                color = ConsoleColor.DarkBlue;
                break;
            case LogEventLevel.Information:
                color = ConsoleColor.Green;
                break;
            case LogEventLevel.Warning:
                color = ConsoleColor.Yellow;
                break;
            case LogEventLevel.Error:
                color = ConsoleColor.DarkRed;
                break;
            case LogEventLevel.Fatal:
                color = ConsoleColor.Red;
                break;
            default:
                color = ConsoleColor.White;
                break;
        }

        this.OutputHelper.WriteLine($"{level}: {DateTime.Now.ToString("HH:mm:ss.fffffff")} {message}", color);
    }
}
