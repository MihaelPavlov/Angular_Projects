namespace TRINV.Shared.Business.Logger;

/// <summary>
/// Defines possible severity levels for a log event.
/// </summary>
public enum LogEventLevel
{
    /// <summary>
    /// Must be rarely (if ever) enabled for a production app.
    /// </summary>
    Verbose = 0,

    /// <summary>
    /// Used for internal system events that are not necessarily observable from the outside, but useful when determining how something happened.
    /// </summary>
    Debug = 1,

    /// <summary>
    /// Describes things happening in the system that correspond to its responsibilities and functions.
    /// </summary>
    Information = 2,

    /// <summary>
    /// Used when service is degraded, endangered, or may be behaving outside of its expected parameters.
    /// </summary>
    Warning = 3,

    /// <summary>
    /// Used when functionality is unavailable or expectations broken.
    /// </summary>
    Error = 4,

    /// <summary>
    /// The most critical level, demands immediate attention.
    /// </summary>
    Fatal = 5
}
