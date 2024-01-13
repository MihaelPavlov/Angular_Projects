namespace TRINV.Application.Services.StockCache.Interfaces;

/// <summary>
/// The interface serve as a cache for storing and retrieving stock information. 
/// </summary>
public interface IStockCache
{
    /// <summary>
    /// The indexer (this[string symbol]) allows for quick retrieval of a Stock object based on its symbol.
    /// </summary>
    /// <param name="symbol">Symbol representing the key of the stock.</param>
    /// <returns>A <see cref="Stock"/></returns>
    Stock? this[string symbol] { get; }

    /// <summary>
    /// Use this method to get all stock names.
    /// </summary>
    /// <returns>Collection of all stock names.</returns>
    string[] GetNames();

    /// <summary>
    /// Use this method to get stock list with specific type.
    /// </summary>
    /// <returns>A stock list.</returns>
    IEnumerable<Stock> GetAllByType(string type);

    /// <summary>
    /// This method specifically returns a  key-value pair represents a stock symbol and its corresponding object.
    /// </summary>
    /// <returns>A key-value pair</returns>
    Dictionary<string, Stock> GetDictionary();

}
