namespace TRINV.Application.Queries;

using Domain.Entities;
using MediatR;
using Interfaces;

public record GetAllCurrenciesQuery : IRequest<IEnumerable<Currency>>;

internal class GetAllCurrenciesHandler : IRequestHandler<GetAllCurrenciesQuery, IEnumerable<Currency>>
{
    private readonly IRepository<Currency> _currencyRepository;
    readonly IUserContext _userContext;
    public GetAllCurrenciesHandler(IRepository<Currency> currencyRepository, IUserContext userContext)
    {
        _currencyRepository = currencyRepository;
        _userContext = userContext;
    }

    public async Task<IEnumerable<Currency>> Handle(GetAllCurrenciesQuery request, CancellationToken cancellationToken)
    {
        var result = await _currencyRepository.GetAllAsync(cancellationToken);
        return result;
    }
}