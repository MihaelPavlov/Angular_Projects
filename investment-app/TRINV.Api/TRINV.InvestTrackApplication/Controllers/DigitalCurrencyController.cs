using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TRINV.Application.Queries.DigitalCurrency;
using TRINV.Shared.Business.Utilities;

namespace TRINV.InvestTrackApplication.Controllers;

[ApiController]
[AllowAnonymous]
[Route("[controller]")]
public class DigitalCurrencyController : ControllerBase
{
    readonly IMediator _mediator;

    public DigitalCurrencyController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult<List<GetDigitalCurrencyModel>>))]
    public async Task<IActionResult> GetCoinList()
    {
        var result = await _mediator.Send(new GetDigitalCurrencyListQuery());

        return Ok(result);
    }
}

