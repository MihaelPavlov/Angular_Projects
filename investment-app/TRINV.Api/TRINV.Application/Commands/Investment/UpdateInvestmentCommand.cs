﻿using MediatR;
using System.ComponentModel.DataAnnotations;
using TRINV.Application.Interfaces;
using TRINV.Domain.Enums;
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
}

internal class UpdateInvestmentCommandHandler : IRequestHandler<UpdateInvestmentCommand, OperationResult>
{
    readonly IRepository<Domain.Entities.Investment> _repository;
    readonly IUnitOfWork _unitOfWork;
    readonly IUserContext _userContext;

    public UpdateInvestmentCommandHandler(IRepository<Domain.Entities.Investment> repository, IUnitOfWork unitOfWork, IUserContext userContext)
    {
        this._repository = repository;
        this._unitOfWork = unitOfWork;
        this._userContext = userContext;
    }

    public async Task<OperationResult> Handle(UpdateInvestmentCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult();
        var investment = await this._repository.GetByIdAsync(request.Id, cancellationToken);

        if (investment is null)
            return operationResult.ReturnWithErrorMessage(new NotFoundException($"{nameof(investment)} with Id {request.Id} was not found"));

        investment.PurchasePrice = request.PurchasePrice;
        investment.Quantity = request.Quantity;

        this._repository.Update(investment);

        await this._unitOfWork.SaveChangesAsync(cancellationToken);

        return operationResult;
    }
}
