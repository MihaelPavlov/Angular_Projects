namespace TRINV.Application.Queries;

using Domain.Entities;
using MediatR;
using Interfaces;

public record GetAllCurrenciesQuery : IRequest<IEnumerable<Currency>>;

internal class GetAllCurrenciesHandler : IRequestHandler<GetAllCurrenciesQuery, IEnumerable<Currency>>
{
    private readonly IRepository<Currency> _currencyRepository;

    public GetAllCurrenciesHandler(IRepository<Currency> currencyRepository)
    {
        _currencyRepository = currencyRepository;
    }

    public async Task<IEnumerable<Currency>> Handle(GetAllCurrenciesQuery request, CancellationToken cancellationToken)
    {
        var result = await _currencyRepository.GetAllAsync(cancellationToken);
        return result;
    }
}