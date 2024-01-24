using MediatR;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.X509Certificates;
using TRINV.Application.Interfaces;
using TRINV.Application.Queries.DigitalCurrency;
using TRINV.Application.Queries.Stock;
using TRINV.Domain.Enums;
using TRINV.Shared.Business.Exceptions;
using TRINV.Shared.Business.Extension;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Application.Commands.Investment;

public class CreateInvestmentCommand : IRequest<OperationResult>
{
    [Required]
    public string AssetId { get; set; } = string.Empty;

    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public decimal Quantity { get; set; }

    [Required]
    public decimal PurchasePrice { get; set; }

    [Required]
    public decimal PurchasePricePerUnit { get; set; }

    [Required]
    public InvestmentType InvestmentType { get; set; }

    public bool IsFromOutsideProvider { get; set; }
}

internal class CreateInvestmentCommandHandler : IRequestHandler<CreateInvestmentCommand, OperationResult>
{
    readonly IRepository<Domain.Entities.Investment> _repository;
    readonly IUnitOfWork _unitOfWork;
    readonly IUserContext _userContext;

    public CreateInvestmentCommandHandler(IRepository<Domain.Entities.Investment> repository, IUnitOfWork unitOfWork, IUserContext userContext)
    {
        this._repository = repository;
        this._unitOfWork = unitOfWork;
        this._userContext = userContext;
    }

    public async Task<OperationResult> Handle(CreateInvestmentCommand request, CancellationToken cancellationToken)
    {
        await this._repository.AddAsync(new Domain.Entities.Investment
        {
            AssetId = request.AssetId,
            InvestmentType = request.InvestmentType,
            Name = request.Name,
            PurchasePrice = request.PurchasePrice,
            PurchasePricePerUnit = request.PurchasePricePerUnit,
            Quantity = request.Quantity,
            UserId = 1,
            CreatedOn = DateTime.UtcNow,
            IsFromOutsideProvider = request.IsFromOutsideProvider,

        }, cancellationToken);

        await this._unitOfWork.SaveChangesAsync(cancellationToken);

        return new OperationResult();
    }
}
