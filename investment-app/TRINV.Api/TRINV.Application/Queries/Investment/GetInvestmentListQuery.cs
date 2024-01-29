using Mapster;
using MediatR;
using TRINV.Application.Interfaces;
using TRINV.Domain.Enums;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Application.Queries.Investment;

public record GetInvestmentListQuery : IRequest<OperationResult<List<GetInvestmentListQueryModel>>>;

internal class GetInvestmentListQueryHandler : IRequestHandler<GetInvestmentListQuery, OperationResult<List<GetInvestmentListQueryModel>>>
{
    readonly IRepository<Domain.Entities.Investment> _repository;

    public GetInvestmentListQueryHandler(IRepository<Domain.Entities.Investment> repository)
    {
        this._repository = repository;
    }

    public async Task<OperationResult<List<GetInvestmentListQueryModel>>> Handle(GetInvestmentListQuery request, CancellationToken cancellationToken)
    {
        var result = await this._repository.GetAllAsync(cancellationToken);

        return new OperationResult<List<GetInvestmentListQueryModel>>
            (result.Adapt<List<GetInvestmentListQueryModel>>());
    }
}

public record GetInvestmentListQueryModel(
    int Id,
    string AssetId,
    string Name,
    decimal Quantity,
    decimal PurchasePrice,
    decimal PurchasePricePerUnit,
    InvestmentType InvestmentType,
    DateTime CreatedOn);
