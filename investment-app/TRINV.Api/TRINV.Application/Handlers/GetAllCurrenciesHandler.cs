namespace TRINV.Application.Handlers;

using Domain.Entities;
using Interfaces;
using MediatR;
using Queries;

public class GetAllCurrenciesHandler : IRequestHandler<GetAllCurrenciesQuery, IEnumerable<Currency>>
{
    private readonly IRepository<Currency> _currencyRepository;

    public GetAllCurrenciesHandler(IRepository<Currency> currencyRepository)
    {
        _currencyRepository = currencyRepository;
    }

    public async Task<IEnumerable<Currency>> Handle(GetAllCurrenciesQuery request, CancellationToken cancellationToken)
    {
        var result = await _currencyRepository.GetAllAsync();

        return  result;
    }
}
