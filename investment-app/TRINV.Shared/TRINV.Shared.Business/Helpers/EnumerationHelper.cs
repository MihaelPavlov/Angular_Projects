﻿namespace TRINV.Shared.Business.Helpers;

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
}
