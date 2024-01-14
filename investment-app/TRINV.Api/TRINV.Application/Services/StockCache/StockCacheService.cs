using Microsoft.Extensions.Caching.Memory;
using System.Text.Json;
using TRINV.Application.Constants;
using TRINV.Application.Services.StockCache.Interfaces;
using TRINV.Shared.Business.Exceptions;
using TRINV.Shared.Business.Extension;
using TRINV.Shared.Business.Logger;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Application.Services.StockCache;

public class StockCacheService : IStockCacheService
{
    readonly IMemoryCache _cache;
    readonly ILoggerService _loggerService;

    public StockCacheService(IMemoryCache cache, ILoggerService loggerService)
    {
        this._cache = cache;
        this._loggerService = loggerService;
    }

    public async Task<OperationResult<IStockCache>> GetCacheAsync(CancellationToken cancellationToken)
    {
        var cacheKey = CacheConstants.KEY_STOCK;

        if (this._cache.TryGetValue(cacheKey, out StockCache? result) && result is not null)
            return new OperationResult<IStockCache>(result);

        using (var entry = this._cache.CreateEntry(cacheKey))
        {
            entry.SetSlidingExpiration(TimeSpan.FromHours(10));
            var operationResult = await this.GetStocks(cancellationToken);

            if (!operationResult.Success)
                return operationResult;

            entry.Value = operationResult.RelatedObject;
            return operationResult;
        }
    }

    private async Task<OperationResult<IStockCache>> GetStocks(CancellationToken cancellationToken)
    {
        var operatioResult = new OperationResult<IStockCache>();

        var httpClient = new HttpClient();
        httpClient.Timeout = new TimeSpan(0, 5, 0);
        httpClient.DefaultRequestHeaders.Add("Upgrade-Insecure-Requests", "1");

        var response = await httpClient.GetAsync("https://financialmodelingprep.com/api/v3/stock/list?apikey=H4p7pqemFJGzwh4b1gOKKMqXxxsd6m0s", cancellationToken);
        var content = await response.Content.ReadAsStringAsync(cancellationToken);

        int pageSize = 10000;
        int pageNumber = 1;
        var splittedRecords = content.Split("},");
        int stockCount = splittedRecords.Count();
        Dictionary<string, Stock> allStocks = new Dictionary<string, Stock>();

        while (stockCount != 0)
        {
            try
            {
                if (stockCount < pageSize)
                {
                    pageSize = stockCount;
                }
                var page = splittedRecords
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToArray();

                var buildString = string.Empty;
                if (pageNumber != 1)
                {
                    buildString += "[";
                }
                buildString += string.Join("},", page);
                buildString += "}]";

                var parsed = JsonDocument.Parse(buildString);
                var result = parsed.Deserialize<Stock[]>();
                if (result is not null)
                {
                    stockCount -= pageSize;
                    allStocks = allStocks.Union(result.ToDictionary(x => x.Symbol, x => x)).GroupBy(x => x.Key).ToDictionary(x => x.Key, x => x.First().Value);
                    pageNumber++;
                }
            }
            catch (Exception ex)
            {
                this._loggerService.Log(LogEventLevel.Error, "The process of getting the stocks from the external api failled.");
                return operatioResult.ReturnWithErrorMessage(new InfrastructureException("The process of parsing the stock failled."));
            }
        }

        operatioResult.RelatedObject = new StockCache(allStocks);

        return operatioResult;
    }

}
