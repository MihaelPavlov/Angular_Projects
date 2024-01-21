namespace TRINV.Shared.Business.Helpers;

using System.Reflection;

public abstract class EnumerationHelper : IComparable
{
    protected EnumerationHelper(int id, string name)
    {
        Id = id;
        Name = name;
    }
    public int Id { get; protected init; }

    public string Name { get; protected init; }


    public override bool Equals(object? obj)
    {
        return obj is EnumerationHelper other && Equals(other);
    }

    public override int GetHashCode() => Id.GetHashCode();

    public int CompareTo(object? obj)
    {
        EnumerationHelper? other = obj as EnumerationHelper;
        return this.Id.CompareTo(other.Id);
    }

    public static IEnumerable<T> GetAll<T>()
    where T : EnumerationHelper
    {
        return typeof(T)
            .GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.DeclaredOnly)
            .Select(field => field.GetValue(null))
            .Cast<T>();
    }
}
