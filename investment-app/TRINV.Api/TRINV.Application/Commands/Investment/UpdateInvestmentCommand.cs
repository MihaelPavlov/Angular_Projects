using MediatR;
using System.ComponentModel.DataAnnotations;
using TRINV.Application.Interfaces;
using TRINV.Shared.Business.Exceptions;
using TRINV.Shared.Business.Extension;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Application.Commands.Investment;

public class UpdateInvestmentCommand : IRequest<OperationResult>
{
    [Required]
    public int Id { get; set; }

    [Required]
    public decimal Quantity { get; set; }

    [Required]
    public decimal PurchasePrice { get; set; }

    [Required]
    public decimal PurchasePricePerUnit { get; set; }
}

internal class UpdateInvestmentCommandHandler : IRequestHandler<UpdateInvestmentCommand, OperationResult>
{
    readonly IRepository<Domain.Entities.Investment> _repository;
    readonly IUnitOfWork _unitOfWork;

    public UpdateInvestmentCommandHandler(
        IRepository<Domain.Entities.Investment> repository,
        IUnitOfWork unitOfWork)
    {
        this._repository = repository;
        this._unitOfWork = unitOfWork;
    }

    public async Task<OperationResult> Handle(UpdateInvestmentCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult();
        var investment = await this._repository.GetByIdAsync(request.Id, cancellationToken);

        if (investment is null)
            return operationResult.ReturnWithErrorMessage(
                new NotFoundException($"{nameof(Domain.Entities.Investment)} with Id {request.Id} was not found!"));


        investment.PurchasePrice = request.PurchasePrice;
        investment.Quantity = request.Quantity;
        investment.PurchasePricePerUnit = request.PurchasePricePerUnit;

        this._repository.Update(investment);

        await this._unitOfWork.SaveChangesAsync(cancellationToken);

        return operationResult;
    }
}
