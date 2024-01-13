using TRINV.Shared.Business.Utilities;

namespace TRINV.Application.Services.StockCache.Interfaces;

public interface IStockCacheService
{
    Task<OperationResult<IStockCache>> GetCacheAsync(CancellationToken cancellationToken);
}
