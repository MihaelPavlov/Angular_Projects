namespace TRINV.InvestTrackApplication.Controllers;

using Application.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

[Route("/currency")]
public class CurrencyController : ControllerBase
{
    private readonly IMediator _mediator;

    public CurrencyController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCurrencies()
    {
        var query = new GetAllCurrenciesQuery();
        var result = await _mediator.Send(query);
        return Ok(result);
    }
}