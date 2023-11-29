namespace TRINV.Application.Queries;

using Domain.Entities;
using MediatR;

public record GetAllCurrenciesQuery() :IRequest<HashSet<Currency>>;