using MediatR;
using System.Drawing;
using TRINV.Application.Interfaces;
using TRINV.Application.Queries.DigitalCurrency;
using TRINV.Domain.Enums;
using TRINV.Shared.Business.Extension;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Application.Queries.Investment;

public class GetInvestmentDashboardInfoQuery : IRequest<OperationResult<GetInvestmentDashboardInfoQueryModel>>
{
}

internal class GetInvestmentDashboardInfoQueryHandler : IRequestHandler<GetInvestmentDashboardInfoQuery, OperationResult<GetInvestmentDashboardInfoQueryModel>>
{
    readonly IRepository<Domain.Entities.Investment> _repository;
    readonly IUnitOfWork _unitOfWork;
    readonly IMediator _mediator;

    public GetInvestmentDashboardInfoQueryHandler(IRepository<Domain.Entities.Investment> repository, IUnitOfWork unitOfWork, IMediator mediator)
    {
        this._repository = repository;
        this._unitOfWork = unitOfWork;
        this._mediator = mediator;
    }

    public async Task<OperationResult<GetInvestmentDashboardInfoQueryModel>> Handle(GetInvestmentDashboardInfoQuery request, CancellationToken cancellationToken)
    {
        //TODO: Refactor it after Lucho extension for where clause in repository
        var investments = await this._repository.GetAllAsync(cancellationToken);

        var cryptoInvestments = investments.Where(x => x.InvestmentType == InvestmentType.Cryptocurrency);

        var sum = cryptoInvestments.Sum(x => x.PurchasePrice);
        var count = cryptoInvestments.Count();

        var cryptoCoins = await this._mediator.Send(new GetDigitalCurrencyListQuery(), cancellationToken);

        if (cryptoCoins.Success == false || cryptoCoins is null || cryptoCoins.RelatedObject is null)
        {
            return new OperationResult<GetInvestmentDashboardInfoQueryModel>().ReturnWithErrorMessage();
        }

        decimal totalInitialInvestment = 0;
        decimal totalCurrentValue = 0;

        foreach (var investment in investments)
        {
            // Find the corresponding coin data
            var coin = cryptoCoins.RelatedObject.Find(c => c.Symbol == investment.AssetId);

            if (coin != null)
            {
                // Calculate the current value of the investment
                decimal currentValue = investment.Quantity * decimal.Parse(coin.PriceUsd);
                totalCurrentValue += currentValue;

                // Calculate the initial investment
                decimal initialInvestment = investment.Quantity * investment.PurchasePricePerUnit;
                totalInitialInvestment += initialInvestment;
            }
            // Handle the case where the corresponding coin data is not found
            else
            {
                Console.WriteLine($"Coin data not found for AssetId: {investment.AssetId}");
            }
        }

        // Calculate the total percent return using the formula
        decimal totalPercentReturn = ((totalCurrentValue - totalInitialInvestment) / totalInitialInvestment) * 100;
        Console.WriteLine($" totalInitialInvestment {totalInitialInvestment}");
        Console.WriteLine($"totalCurrentValue {totalCurrentValue}");
        return new OperationResult<GetInvestmentDashboardInfoQueryModel> { RelatedObject = new GetInvestmentDashboardInfoQueryModel(sum, count, totalPercentReturn) };
    }
}

public record GetInvestmentDashboardInfoQueryModel(
    decimal TotalInvestmentAmount,
    int TotalInvestments,
    decimal RateOfReturn);