using MediatR;
using TRINV.Application.Common.Queries.Models;
using TRINV.Application.Services.StockCache.Interfaces;
using TRINV.Shared.Business.Exceptions;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Application.Queries.Stock;

public class GetStockListQuery : BasePaginationQuery, IRequest<OperationResult<List<GetStockListQueryModel>>>
{

}

internal class GetStockListQueryHandler : IRequestHandler<GetStockListQuery, OperationResult<List<GetStockListQueryModel>>>
{
    readonly IStockCacheService _stockCacheService;

    public GetStockListQueryHandler(IStockCacheService stockCacheService)
    {
        _stockCacheService = stockCacheService;
    }

    public async Task<OperationResult<List<GetStockListQueryModel>>> Handle(GetStockListQuery request, CancellationToken cancellationToken)
    {
        var operationResult = await this._stockCacheService.GetCacheAsync(cancellationToken);

        if (operationResult is null)
            return new OperationResult<List<GetStockListQueryModel>>().ReturnWithErrorMessage(new BadRequestException(ErrorMessages.UnsuccessfulOperation));

        if (operationResult.Success && operationResult.RelatedObject != null)
        {
            var stocks = operationResult.RelatedObject
                 .GetDictionary()
                 .Skip((request.PageNumber - 1) * request.PageSize)
                 .Take(request.PageSize)
                 .Select(x => new GetStockListQueryModel(
                     x.Value.Symbol,
                     x.Value.Exchange,
                     x.Value.ExchangeShortName,
                     x.Value.Price,
                     x.Value.Name,
                     x.Value.Type
                     ))
                 .ToList();

            return new OperationResult<List<GetStockListQueryModel>>(stocks);
        }

        return operationResult.ChangeType<List<GetStockListQueryModel>>();
    }
}

public record GetStockListQueryModel(
    string Symbol,
    string Exchange,
    string ExchangeShortNamem,
    decimal? Price,
    string Name,
    string Type);
