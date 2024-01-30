namespace TRINV.Application.Queries.Dashboard;

using Domain.Entities;
using Interfaces;
using MediatR;
using Shared.Business.Utilities;

public record GetUserLatestInvestmentsQuery : IRequest<OperationResult<IList<GetUserLatestInvestmentsQueryModel>>>;

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
            .GetAllWithPredicateAsync(i => i.UserId == _userContext.UserId, cancellationToken);

        var result = currentUserInvestments
            .OrderByDescending(i => i.CreatedOn)
            .Select(x => new GetUserLatestInvestmentsQueryModel
            {
                Id = x.Id,
                Name = x.Name,
                Symbol = x.AssetId,
                DateAdded = x.CreatedOn,
                TotalValueInFiatAdded = x.PurchasePrice.ToString("F2"),
            })
            .ToList();

        operationResult.RelatedObject = result;

        return operationResult;
    }
}

public record GetUserLatestInvestmentsQueryModel
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Symbol { get; set; } = string.Empty;

    public DateTime DateAdded { get; set; }

    public string TotalValueInFiatAdded { get; set; } = string.Empty;
}
