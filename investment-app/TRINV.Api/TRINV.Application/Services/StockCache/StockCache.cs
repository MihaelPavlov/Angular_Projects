using TRINV.Application.Services.StockCache.Interfaces;

namespace TRINV.Application.Services.StockCache;

/// <summary>
/// Custom Implementation of <see cref="IStockCache"/>
/// </summary>
public class StockCache : IStockCache
{
    /// <summary>
    ///  Dictionary that stores stock symbols as keys and corresponding Stock objects as values.
    /// </summary>
    readonly Dictionary<string, Stock> _keyValuePair;

    /// <summary>
    /// The constructor initializes the cache with a provided dictionary of stock symbols and their corresponding Stock objects.
    /// </summary>
    /// <param name="keyValuePair"></param>
    public StockCache(Dictionary<string, Stock> keyValuePair)
    {
        _keyValuePair = keyValuePair;
    }

    /// <inheritdoc/>
    public Stock? this[string symbol]
    {
        get
        {
            if (_keyValuePair.TryGetValue(symbol, out var value))
                return value;

            return null;
        }
    }

    /// <inheritdoc/>
    public IEnumerable<Stock> GetAllByType(string type) => this._keyValuePair
        .Where(x => x.Value.Type == type)
        .Select(x => x.Value)
        .ToList();

    /// <inheritdoc/>
    public Dictionary<string, Stock> GetDictionary() => this._keyValuePair;


    /// <inheritdoc/>
    public string[] GetNames() => this._keyValuePair.Select(id => id.Value.Name).ToArray();
}
