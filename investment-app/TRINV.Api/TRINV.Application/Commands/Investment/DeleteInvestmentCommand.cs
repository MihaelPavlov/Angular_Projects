using MediatR;
using System.ComponentModel.DataAnnotations;
using TRINV.Application.Interfaces;
using TRINV.Shared.Business.Exceptions;
using TRINV.Shared.Business.Extension;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Application.Commands.Investment;

public class DeleteInvestmentCommand : IRequest<OperationResult>
{
    [Required]
    public int Id { get; set; }

    public DeleteInvestmentCommand(int id)
    {
        this.Id = id;
    }
}

internal class DeleteInvestmentCommandHandler : IRequestHandler<DeleteInvestmentCommand, OperationResult>
{
    readonly IRepository<Domain.Entities.Investment> _repository;
    readonly IUnitOfWork _unitOfWork;

    public DeleteInvestmentCommandHandler(IRepository<Domain.Entities.Investment> repository, IUnitOfWork unitOfWork)
    {
        this._repository = repository;
        this._unitOfWork = unitOfWork;
    }

    public async Task<OperationResult> Handle(DeleteInvestmentCommand request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult();
        var investment = await this._repository.GetByIdAsync(request.Id, cancellationToken);

        if (investment is null)
            return operationResult.ReturnWithErrorMessage(new NotFoundException($"{nameof(investment)} with Id {request.Id} was not found"));

        this._repository.Delete(investment);

        await this._unitOfWork.SaveChangesAsync(cancellationToken);

        return operationResult;
    }
}
