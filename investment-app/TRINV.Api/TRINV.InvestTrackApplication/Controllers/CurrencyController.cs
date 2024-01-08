namespace TRINV.InvestTrackApplication.Controllers;

using Application.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using TRINV.Shared.Business.Utilities;

[Route("/currency")]
[AllowAnonymous]
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


    [HttpGet("example")]
    public async Task<IActionResult> ExampleOfUsingOperationResult()
    {
        var result = await _mediator.Send(new ExampleQuery());

        return Ok(result);
    }
}
