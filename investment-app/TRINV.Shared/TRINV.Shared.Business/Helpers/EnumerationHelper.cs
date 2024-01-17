namespace TRINV.Shared.Business.Helpers;

public abstract class EnumerationHelper : IComparable
{
    //private static readonly Dictionary<int, TEnum> Enumerations = CreateEnumerations();

    protected EnumerationHelper(int id, string name)
    {
        Id = id;
        Name = name;
    }
    public int Id { get; protected init; }

    public string Name { get; protected init; }

    //public static TEnum FromValue(int value)
    //{
    //    return Enumerations.TryGetValue(
    //        value,
    //        out TEnum? enumeration)?
    //            enumeration :
    //            default!;
    //}

    //public static TEnum FromName(string name)
    //{
    //    return Enumerations
    //        .Values
    //        .SingleOrDefault(e => e.Name == name)!;
    //}

    //public bool Equals(Enumeration<TEnum>? other)
    //{
    //    if (other is null)
    //        return false;

    //    return GetType() == other.GetType() && 
    //           Id.Equals(other.Id);
    //}

    public override bool Equals(object? obj)
    {
        return obj is EnumerationHelper other && Equals(other);
    }

    public override int GetHashCode() => Id.GetHashCode();

    public int CompareTo(object? obj)
    {
        throw new NotImplementedException();
    }


    //private static Dictionary<int, TEnum> CreateEnumerations()
    //{
    //    var enumerationTypes = typeof(TEnum);

    //    var fieldsForType = enumerationTypes
    //        .GetFields(
    //            BindingFlags.Public |
    //            BindingFlags.Static |
    //            BindingFlags.FlattenHierarchy
    //        )
    //        .Where(fieldInfo =>
    //            enumerationTypes.IsAssignableFrom(fieldInfo.FieldType))
    //        .Select(fieldInfo =>
    //            (TEnum)fieldInfo.GetValue(default)!);

    //    return fieldsForType.ToDictionary(x => x.Id);
    //}
}
