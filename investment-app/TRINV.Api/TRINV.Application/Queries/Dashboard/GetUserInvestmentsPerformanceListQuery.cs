namespace TRINV.Application.Queries.Dashboard;

using DigitalCurrency;
using Domain.Entities;
using Domain.Enums;
using Interfaces;
using MediatR;
using Shared.Business.Exceptions;
using Shared.Business.Extension;
using Shared.Business.Utilities;

public record GetInvestmentPerformanceQuery(InvestmentType InvestmentType) : IRequest<OperationResult<List<InvestmentPerformanceQueryModel>>>;


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

        if(request.InvestmentType == InvestmentType.Cryptocurrency)
        {
            var currentCryptoPrices = await _mediator.Send(new GetDigitalCurrencyListQuery(), cancellationToken);

            foreach (var item in groupedInvestments)
            {
                var currentItemPrice = decimal.Parse(currentCryptoPrices.RelatedObject
                    .Where(s => s.Symbol == item.Symbol)
                    .Select(p =>p.PriceUsd)
                    .FirstOrDefault());

                currentPrices.Add(item.Symbol, currentItemPrice);
            }
        }

        var currentUserInvestmentsPerformanceList = new List<InvestmentPerformanceQueryModel>();

        foreach (var investment in groupedInvestments)
        {
            var currentInvestmentPrice = currentPrices[investment.Symbol];

            var returnRate = ((currentInvestmentPrice - investment.AverageValuePerUnitInFiat) / investment.AverageValuePerUnitInFiat) * 100;

            var result = new InvestmentPerformanceQueryModel
            {
                AssetId = investment.Symbol,
                Name = investment.Name,
                TotalInitialInvestment = Math.Round(investment.TotalValueInFiat, 2),
                TotalCurrentInvestment = Math.Round(currentInvestmentPrice, 2),
                Rate = Math.Round(returnRate, 2)
            };

            currentUserInvestmentsPerformanceList.Add(result);
        }

        currentUserInvestmentsPerformanceList = currentUserInvestmentsPerformanceList
            .OrderByDescending(x => x.Rate)
            .ToList();

        operationResult.RelatedObject = currentUserInvestmentsPerformanceList;

        return operationResult;
    }
}

public record InvestmentPerformanceQueryModel
{
    public string AssetId { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public decimal TotalInitialInvestment { get; set; }

    public decimal TotalCurrentInvestment { get; set; }

    public decimal Rate { get; set; }
}
