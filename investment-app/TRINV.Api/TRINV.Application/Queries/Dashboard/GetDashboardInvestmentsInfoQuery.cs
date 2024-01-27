using MediatR;
using TRINV.Application.Interfaces;
using TRINV.Application.Queries.DigitalCurrency;
using TRINV.Domain.Enums;
using TRINV.Shared.Business.Exceptions;
using TRINV.Shared.Business.Extension;
using TRINV.Shared.Business.Logger;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Application.Queries.Dashboard;

public record GetDashboardInvestmentsInfoQuery(InvestmentType InvestmentType) : IRequest<OperationResult<GetDashboardInvestmentsInfoQueryModel>>;

internal class GetDashboardInvestmentsInfoQueryHandler : IRequestHandler<GetDashboardInvestmentsInfoQuery, OperationResult<GetDashboardInvestmentsInfoQueryModel>>
{
    readonly IRepository<Domain.Entities.Investment> _repository;
    readonly IMediator _mediator;
    readonly ILoggerService _logger;
    readonly IUserContext _userContext;

    public GetDashboardInvestmentsInfoQueryHandler(IRepository<Domain.Entities.Investment> repository, IUserContext userContext,
        IMediator mediator, ILoggerService logger)
    {
        _repository = repository;
        _userContext = userContext;
        _mediator = mediator;
        _logger = logger;
    }

    public async Task<OperationResult<GetDashboardInvestmentsInfoQueryModel>> Handle(GetDashboardInvestmentsInfoQuery request, CancellationToken cancellationToken)
    {
        // TODO: Use the userContext instead of 1
        var investments = await _repository.GetAllWithPredicateAsync(x => x.UserId == 1 && x.InvestmentType == request.InvestmentType, cancellationToken);
        var operationResult = new OperationResult<GetDashboardInvestmentsInfoQueryModel>();

        if (!investments.Any())
            return operationResult;

        // Calculating ROI ( Return of Investments )
        decimal totalInitialInvestment = 0;
        decimal totalCurrentValue = 0;

        switch (request.InvestmentType)
        {
            case InvestmentType.Stock:
                return operationResult.ReturnWithErrorMessage(new InfrastructureException());
            case InvestmentType.Cryptocurrency:
                var cryptoCoins = await _mediator.Send(new GetDigitalCurrencyListQuery(), cancellationToken);

                if (cryptoCoins.Success == false || cryptoCoins is null || cryptoCoins.RelatedObject is null)
                    return operationResult.ReturnWithErrorMessage(new InfrastructureException());

                foreach (var investment in investments)
                {
                    var coin = cryptoCoins.RelatedObject.FirstOrDefault(c => c.Symbol == investment.AssetId);

                    if (coin != null)
                    {
                        // Calculate the current value of the investment
                        totalCurrentValue += investment.Quantity * decimal.Parse(coin.PriceUsd);

                        // Calculate the initial investment
                        totalInitialInvestment += investment.Quantity * investment.PurchasePricePerUnit;
                    }
                    // Handle the case where the corresponding coin data is not found
                    else
                    {
                        _logger.Log(LogEventLevel.Warning, $"Coin data not found for AssetId: {investment.AssetId}");
                    }
                }
                break;
            case InvestmentType.SavingsAccount:
                return operationResult.ReturnWithErrorMessage(new InfrastructureException());
            default:
                break;
        }

        // Calculate the total percent return using the formula
        decimal totalPercentReturn = (totalCurrentValue - totalInitialInvestment) / totalInitialInvestment * 100;

        operationResult.RelatedObject = new GetDashboardInvestmentsInfoQueryModel(
            investments.Sum(x => x.PurchasePrice),
            investments.Count(),
            totalPercentReturn);

        return operationResult;
    }
}

public record GetDashboardInvestmentsInfoQueryModel(
    decimal TotalInvestmentAmount,
    int TotalInvestments,
    decimal RateOfReturn);
