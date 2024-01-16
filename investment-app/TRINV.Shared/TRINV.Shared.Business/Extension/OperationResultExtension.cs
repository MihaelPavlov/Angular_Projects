using TRINV.Shared.Business.Exceptions.Interfaces;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Shared.Business.Extension;

public static class OperationResultExtension
{
    /// <summary>
    /// Appends error messages from one <typeparamref name="TOriginal"/> to another <typeparamref name="TOther"/>.
    /// </summary>
    /// <typeparam name="TOriginal">A type that inherits from <see cref="OperationResult"/>.</typeparam>
    /// <typeparam name="TOther">A type that inherits from <see cref="OperationResult"/>.</typeparam>
    /// <param name="originalOperationResult">The <see cref="OperationResult"/> to append to.</param>
    /// <param name="otherOperationResult">The <see cref="OperationResult"/> to append from.</param>
    /// <returns></returns>
    /// <exception cref="ArgumentNullException"></exception>
    public static TOriginal AppendErrorMessage<TOriginal, TOther>(this TOriginal originalOperationResult, TOther otherOperationResult)
           where TOriginal : OperationResult
           where TOther : OperationResult
    {
        if (originalOperationResult is null)
            throw new ArgumentNullException(nameof(originalOperationResult));

        if (otherOperationResult is null)
            return originalOperationResult;

        originalOperationResult.Success = false;
        originalOperationResult.InitialException = otherOperationResult.InitialException;

        return originalOperationResult;
    }

    /// <summary>
    /// Use this method in the case when we want to stop the request flow.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="operationResult"></param>
    /// <param name="error"></param>
    /// <returns></returns>
    public static T ReturnWithErrorMessage<T>(this T operationResult, IError error)
        where T : OperationResult
    {
        operationResult.Success = false;
        operationResult.InitialException = error;

        return operationResult;
    }

    /// <summary>
    /// Method which is return the current instance of the OperationResult<T>.
    /// And it's give us option to pass a initial exception.
    /// </summary>
    /// <param name="error">Optional error which is initializing the InitialException in the current instance.</param>
    public static OperationResult<T> ReturnWithErrorMessage<T>(this OperationResult<T> operationResult, IError? error = null)
        where T : class
    {
        if (error != null)
        {
            operationResult.Success = false;
            operationResult.InitialException = error;
        }

        return operationResult;
    }

    /// <summary>
    /// Creates a new <see cref="OperationResult{U}"/> with a different generic type.
    /// </summary>
    /// <typeparam name="U">The new type for the RelatedObject.</typeparam>
    /// <param name="newRelatedObject">The new value for the RelatedObject.</param>
    /// <returns>A new <see cref="OperationResult{U}"/> with the specified type and value.</returns>
    public static OperationResult<U> ChangeType<U>(this OperationResult operationResult, U? newRelatedObject = default)
    {
        if (newRelatedObject is null)
            return new OperationResult<U>()
            {
                InitialException = operationResult.InitialException,
                Success = operationResult.Success,
            };

        return new OperationResult<U>(newRelatedObject)
        {
            InitialException = operationResult.InitialException,
            Success = operationResult.Success,
        };
    }
}
