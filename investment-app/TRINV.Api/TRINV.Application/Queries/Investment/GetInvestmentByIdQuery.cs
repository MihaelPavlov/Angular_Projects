using Mapster;
using MediatR;
using System.ComponentModel.DataAnnotations;
using TRINV.Application.Interfaces;
using TRINV.Domain.Enums;
using TRINV.Shared.Business.Exceptions;
using TRINV.Shared.Business.Extension;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Application.Queries.Investment;

public class GetInvestmentByIdQuery : IRequest<OperationResult<GetInvestmentByIdQueryModel>>
{
    [Required]
    public int Id { get; set; }

    public GetInvestmentByIdQuery(int id)
    {
        this.Id = id;
    }
}

internal class GetInvestmentByIdQueryHandler : IRequestHandler<GetInvestmentByIdQuery, OperationResult<GetInvestmentByIdQueryModel>>
{
    readonly IRepository<Domain.Entities.Investment> _repository;

    public GetInvestmentByIdQueryHandler(IRepository<Domain.Entities.Investment> repository)
    {
        this._repository = repository;
    }
    public async Task<OperationResult<GetInvestmentByIdQueryModel>> Handle(GetInvestmentByIdQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<GetInvestmentByIdQueryModel>();
        var investment = await this._repository.GetByIdAsync(request.Id, cancellationToken);

        if (investment is null)
            return operationResult.ReturnWithErrorMessage(new NotFoundException($"{nameof(investment)} with Id {request.Id} was not found"));

        operationResult.RelatedObject = investment.Adapt<GetInvestmentByIdQueryModel>();

        return operationResult;
    }
}

public record GetInvestmentByIdQueryModel(
    int Id,
    string AssetId,
    string Name,
    decimal Quantity,
    decimal PurchasePrice,
    InvestmentType InvestmentType,
    DateTime CreatedOn);