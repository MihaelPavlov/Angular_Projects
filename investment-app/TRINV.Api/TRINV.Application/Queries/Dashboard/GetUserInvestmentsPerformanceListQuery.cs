namespace TRINV.Application.Queries.Dashboard;

using DigitalCurrency;
using Domain.Entities;
using Domain.Enums;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;

public record GetInvestmentPerformanceQuery(InvestmentType InvestmentType) : IRequest<OperationResult<List<GetInvestmentPerformanceQueryModel>>>;

internal class GetInvestmentPerformanceQueryHandler : IRequestHandler<GetInvestmentPerformanceQuery, OperationResult<List<GetInvestmentPerformanceQueryModel>>>
{
    readonly IRepository<Investment> _investmentRepository;
    readonly IUserContext _userContext;
    readonly IMediator _mediator;

    public GetInvestmentPerformanceQueryHandler(IRepository<Investment> investmentRepository, IUserContext userContext, IMediator mediator)
    {
        _investmentRepository = investmentRepository;
        _userContext = userContext;
        _mediator = mediator;
    }

    public async Task<OperationResult<List<GetInvestmentPerformanceQueryModel>>> Handle(GetInvestmentPerformanceQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<List<GetInvestmentPerformanceQueryModel>>();

        // TODO: This needs to be removed when stocks API's are added.
        if (request.InvestmentType != InvestmentType.Cryptocurrency)
            return operationResult.ReturnWithErrorMessage(new NotFoundException());

        var currentUserInvestments = await _investmentRepository
            .GetAllWithPredicateAsync(i => i.UserId == _userContext.UserId
                                           && i.InvestmentType == request.InvestmentType, cancellationToken);

        var groupedInvestments = currentUserInvestments
            .GroupBy(i => i.AssetId)
            .Select(x => new
            {
                Symbol = x.Key,
                Name = x.First().Name,
                TotalQuantity = x.Sum(i => i.Quantity),
                TotalValueInFiat = x.Sum(i => i.PurchasePrice),
                AverageValuePerUnitInFiat = x.Sum(i => i.PurchasePrice) / x.Sum(q => q.Quantity),
            });

        Dictionary<string, decimal> currentPrices = new Dictionary<string, decimal>();

        var currentCryptoPrices = await _mediator.Send(new GetDigitalCurrencyListQuery(), cancellationToken);

        if (currentCryptoPrices == null || !currentCryptoPrices.Success || currentCryptoPrices.RelatedObject == null)
            return operationResult.ReturnWithErrorMessage(new InfrastructureException());

        currentPrices = currentCryptoPrices.RelatedObject
            .Where(s => groupedInvestments.Any(gi => gi.Symbol == s.Symbol))
            .ToDictionary(s => s.Symbol, p => decimal.Parse(p.PriceUsd));

        var currentUserInvestmentsPerformanceList = groupedInvestments
            .Select(investment =>
            {
                var currentInvestmentPrice = currentPrices.GetValueOrDefault(investment.Symbol, 0m);

                var returnRate = ((currentInvestmentPrice - investment.AverageValuePerUnitInFiat) / investment.AverageValuePerUnitInFiat) * 100;

                return new GetInvestmentPerformanceQueryModel
                {
                    AssetId = investment.Symbol,
                    Name = investment.Name,
                    TotalInitialInvestment = Math.Round(investment.TotalValueInFiat, 2),
                    TotalCurrentInvestment = Math.Round(investment.TotalValueInFiat + (investment.TotalValueInFiat * (returnRate / 100)), 2),
                    Rate = Math.Round(returnRate, 2),
                };
            })
            .OrderByDescending(x => x.Rate)
            .ToList();

        operationResult.RelatedObject = currentUserInvestmentsPerformanceList;

        return operationResult;
    }
}

public class GetInvestmentPerformanceQueryModel
{
    public string AssetId { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public decimal TotalInitialInvestment { get; set; }

    public decimal TotalCurrentInvestment { get; set; }

    public decimal Rate { get; set; }
}
