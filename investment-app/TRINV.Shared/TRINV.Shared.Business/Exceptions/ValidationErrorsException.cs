using System.Text.Json.Serialization;

namespace TRINV.Shared.Business.Exceptions;

public class ValidationErrorsException : Exception
{
    public ValidationErrorsException()
    : base("One or more validation failures have occurred.")
    {
        Errors = new Dictionary<string, string[]>();
    }

    public ValidationErrorsException(IEnumerable<ValidationError> failures) : this()
    {
        Errors = failures
            .GroupBy(e => e.PropertyName, e => e.ErrorMessage)
            .ToDictionary(failureGroup => failureGroup.Key, failureGroup => failureGroup.ToArray());
    }

    public ValidationErrorsException(IDictionary<string, string[]> errors) : this()
    {
        Errors = errors;
    }

    public ValidationErrorsException(string propertyName, string errorMessage) : this()
    {
        Errors = new Dictionary<string, string[]>
    {
        { propertyName, new string[] { errorMessage } }
    };
    }

    public IDictionary<string, string[]> Errors { get; }

    [Serializable]
    public class ValidationError
    {
        [JsonPropertyName("propertyName")]
        public string PropertyName { get; set; }

        [JsonPropertyName("errorMessage")]
        public string ErrorMessage { get; set; }

        public ValidationError(string propertyName, string errorMessage)
        {
            PropertyName = propertyName;
            ErrorMessage = errorMessage;
        }
    }
}
