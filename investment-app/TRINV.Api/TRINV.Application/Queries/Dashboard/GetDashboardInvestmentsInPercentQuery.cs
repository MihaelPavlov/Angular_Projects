using MediatR;
using TRINV.Application.Interfaces;
using TRINV.Domain.Enums;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Application.Queries.Dashboard;

public record GetDashboardInvestmentsInPercentQuery(InvestmentType InvestmentType) : IRequest<OperationResult<List<GetDashboardInvestmentsInPercentQueryModel>>>;

internal class GetDashboardInvestmentsInPercentQueryHandler : IRequestHandler<GetDashboardInvestmentsInPercentQuery, OperationResult<List<GetDashboardInvestmentsInPercentQueryModel>>>
{
    readonly IRepository<Domain.Entities.Investment> _repository;
    readonly IUserContext _userContext;

    public GetDashboardInvestmentsInPercentQueryHandler(IRepository<Domain.Entities.Investment> repository, IUserContext userContext)
    {
        _repository = repository;
        _userContext = userContext;
    }

    public async Task<OperationResult<List<GetDashboardInvestmentsInPercentQueryModel>>> Handle(GetDashboardInvestmentsInPercentQuery request, CancellationToken cancellationToken)
    {
        // TODO: Use the userContext instead of 1
        var investments = await _repository
            .GetAllWithPredicateAsync(x => x.UserId == 1 && x.InvestmentType == request.InvestmentType, cancellationToken);

        var operationResult = new OperationResult<List<GetDashboardInvestmentsInPercentQueryModel>>();

        if (!investments.Any())
            return operationResult;

        operationResult.RelatedObject = new List<GetDashboardInvestmentsInPercentQueryModel>();

        var groupedInvestments = investments.GroupBy(x => x.AssetId, x => x);

        var totalInvestmentValue = groupedInvestments.Sum(x => x.Sum(y => y.PurchasePrice));

        var queryModels = groupedInvestments
            .Select(investmentGroup => new GetDashboardInvestmentsInPercentQueryModel
            (
                investmentGroup.Key,
                 investmentGroup.First().Name,
                investmentGroup.Sum(x => x.Quantity),
               decimal.Round(investmentGroup.Sum(x => x.PurchasePrice) / totalInvestmentValue * 100, 2)
            ))
            .OrderByDescending(model => model.Percent)
            .ToList();

        operationResult.RelatedObject.AddRange(queryModels);

        return operationResult;
    }
}

public record GetDashboardInvestmentsInPercentQueryModel(
    string AssetId,
    string Name,
    decimal Quantity,
    decimal Percent);
