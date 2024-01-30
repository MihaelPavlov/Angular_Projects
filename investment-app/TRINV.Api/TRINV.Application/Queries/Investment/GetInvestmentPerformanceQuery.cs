namespace TRINV.Application.Queries.Investment;

using Domain.Entities;
using Domain.Enums;
using Interfaces;
using MediatR;
using Shared.Business.Utilities;

public record GetInvestmentPerformanceQuery : IRequest<OperationResult<List<InvestmentPerformanceQueryModel>>>;


internal class GetInvestmentPerformanceQueryHandler : IRequestHandler<GetInvestmentPerformanceQuery, OperationResult<List<InvestmentPerformanceQueryModel>>>
{
    readonly IRepository<Investment> _investmentRepository;
    readonly IUserContext _userContext;
    readonly IMediator _mediator;

    public GetInvestmentPerformanceQueryHandler(IRepository<Investment> investmentRepository, IUserContext userContext, IMediator mediator)
    {
        _investmentRepository = investmentRepository;
        _userContext = userContext;
        _mediator = mediator;
    }

    public async Task<OperationResult<List<InvestmentPerformanceQueryModel>>> Handle(GetInvestmentPerformanceQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<List<InvestmentPerformanceQueryModel>>();

        var currentUserInvestments = await _investmentRepository
            .GetAllWithPredicateAsync(i => i.UserId == _userContext.UserId 
                                           && i.InvestmentType == InvestmentType.Cryptocurrency, cancellationToken);

        return operationResult;
    }
}

public record InvestmentPerformanceQueryModel
{
    string Symbol { get; set; } = string.Empty;

    string Name { get; set; } = string.Empty;

    double TotalValueInFiat { get; set; }

    double CurrentValueInFiat { get; set; }

    double ReturnRateInPercent { get; set;}
}