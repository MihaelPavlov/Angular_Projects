namespace TRINV.Application.Queries.Dashboard;

using DigitalCurrency;
using Domain.Entities;
using Domain.Enums;
using Interfaces;
using MediatR;
using Shared.Business.Utilities;

public record GetInvestmentPerformanceQuery : IRequest<OperationResult<List<InvestmentPerformanceQueryModel>>>;


internal class GetInvestmentPerformanceQueryHandler : IRequestHandler<GetInvestmentPerformanceQuery, OperationResult<List<InvestmentPerformanceQueryModel>>>
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

    public async Task<OperationResult<List<InvestmentPerformanceQueryModel>>> Handle(GetInvestmentPerformanceQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<List<InvestmentPerformanceQueryModel>>();

        var currentUserInvestments = await _investmentRepository
            .GetAllWithPredicateAsync(i => i.UserId == _userContext.UserId
                                           && i.InvestmentType == InvestmentType.Cryptocurrency, cancellationToken);

        var currentCryptoPrices = await _mediator.Send(new GetDigitalCurrencyListQuery(), cancellationToken);

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

        var currentUserInvestmentsPerformanceList = new List<InvestmentPerformanceQueryModel>();

        foreach (var investment in groupedInvestments)
        {
            var currentInvestmentPrice = 
                decimal.Parse(currentCryptoPrices.RelatedObject
                    .Where(s => s.Symbol == investment.Symbol)
                    .Select(p => p.PriceUsd)
                    .FirstOrDefault());

            var returnRate = ((currentInvestmentPrice - investment.AverageValuePerUnitInFiat) / investment.AverageValuePerUnitInFiat) * 100;

            var result = new InvestmentPerformanceQueryModel
            {
                Symbol = investment.Symbol,
                Name = investment.Name,
                Quantity = investment.TotalQuantity.ToString("F2"),
                TotalValueInFiat = investment.TotalValueInFiat.ToString("F2"),
                CurrentValueInFiat = currentInvestmentPrice.ToString("F2"),
                AverageValuePerUnitInFiat = investment.AverageValuePerUnitInFiat.ToString("F2"),
                ReturnRateInPercent = returnRate.ToString("F2")
            };

            currentUserInvestmentsPerformanceList.Add(result);
        }

        currentUserInvestmentsPerformanceList = currentUserInvestmentsPerformanceList
            .OrderByDescending(inv => decimal.Parse(inv.ReturnRateInPercent))
            .ToList();

        operationResult.RelatedObject = currentUserInvestmentsPerformanceList;

        return operationResult;
    }
}

public record InvestmentPerformanceQueryModel
{
    public string Symbol { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string Quantity { get; set; } = string.Empty;

    public string TotalValueInFiat { get; set; } = string.Empty;

    public string CurrentValueInFiat { get; set; } = string.Empty;

    public string AverageValuePerUnitInFiat { get; set; } = string.Empty;

    public string ReturnRateInPercent { get; set; } = string.Empty;
}
