namespace TRINV.Application.Queries.Dashboard;

using System.Globalization;
using Domain.Entities;
using Domain.Enums;
using Interfaces;
using MediatR;
using Shared.Business.Utilities;

public record GetUserLatestInvestmentsQuery(InvestmentType InvestmentType) : IRequest<OperationResult<IList<GetUserLatestInvestmentsQueryModel>>>;

internal class GetUserLatestInvestmentsQueryHandler : IRequestHandler<GetUserLatestInvestmentsQuery, OperationResult<IList<GetUserLatestInvestmentsQueryModel>>>
{
    readonly IRepository<Investment> _investmentRepository;
    readonly IUserContext _userContext;

    public GetUserLatestInvestmentsQueryHandler(IRepository<Investment> investmentRepository, IUserContext userContext)
    {
        _investmentRepository = investmentRepository;
        _userContext = userContext;
    }

    public async Task<OperationResult<IList<GetUserLatestInvestmentsQueryModel>>> Handle(GetUserLatestInvestmentsQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<IList<GetUserLatestInvestmentsQueryModel>>();

        var currentUserInvestments = await _investmentRepository
            .GetAllWithPredicateAsync(i => i.UserId == _userContext.UserId &&
                i.InvestmentType == request.InvestmentType, cancellationToken);

        var result = currentUserInvestments
            .OrderByDescending(i => i.CreatedOn)
            .Select(x => new GetUserLatestInvestmentsQueryModel
            {
                Name = x.Name,
                AssetId = x.AssetId,
                DateAdded = x.CreatedOn,
                Amount = Math.Round(x.PurchasePrice * x.Quantity, 2)
            })
            .ToList();

        operationResult.RelatedObject = result;

        return operationResult;
    }
}

public record GetUserLatestInvestmentsQueryModel
{
    public string AssetId { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public DateTime DateAdded { get; set; }

    public decimal Amount { get; set; }
}
