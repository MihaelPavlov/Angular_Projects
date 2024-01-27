using MediatR;
using TRINV.Application.Interfaces;
using TRINV.Domain.Enums;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Application.Queries.Dashboard;

public record GetDashboardInvestmentsInPercentQuery(InvestmentType InvestmentType) : IRequest<OperationResult<IList<GetDashboardInvestmentsInPercentQueryModel>>>;

internal class GetDashboardInvestmentsInPercentQueryHandler : IRequestHandler<GetDashboardInvestmentsInPercentQuery, OperationResult<IList<GetDashboardInvestmentsInPercentQueryModel>>>
{
    readonly IRepository<Domain.Entities.Investment> _repository;
    readonly IUserContext _userContext;

    public GetDashboardInvestmentsInPercentQueryHandler(IRepository<Domain.Entities.Investment> repository, IUserContext userContext)
    {
        _repository = repository;
        _userContext = userContext;
    }

    public async Task<OperationResult<IList<GetDashboardInvestmentsInPercentQueryModel>>> Handle(GetDashboardInvestmentsInPercentQuery request, CancellationToken cancellationToken)
    {
        // TODO: Use the userContext instead of 1
        var investments = await _repository
            .GetAllWithPredicateAsync(x => x.UserId == 1 && x.InvestmentType == request.InvestmentType, cancellationToken);

        var operationResult = new OperationResult<IList<GetDashboardInvestmentsInPercentQueryModel>>();

        if (!investments.Any())
            return operationResult;

        operationResult.RelatedObject = new List<GetDashboardInvestmentsInPercentQueryModel>();

        var groupedInvestments = investments.GroupBy(x => x.AssetId, x => x);

        var totalInvestmentValue = groupedInvestments.Sum(x => x.Sum(y => y.PurchasePrice));

        foreach (var investment in groupedInvestments)
        {
            var percent = investment.Sum(x => x.PurchasePrice) / totalInvestmentValue * 100;

            operationResult.RelatedObject.Add(
                new GetDashboardInvestmentsInPercentQueryModel(
                    investment.Key,
                    investment.First().Name,
                    investment.Sum(x => x.Quantity),
                    percent));
        }

        return operationResult;
    }
}

public record GetDashboardInvestmentsInPercentQueryModel(
    string AssetId,
    string Name,
    decimal Quantity,
    decimal Percent);
