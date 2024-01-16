using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TRINV.Application.Queries.Stock;

namespace TRINV.InvestTrackApplication.Controllers;

[ApiController]
[AllowAnonymous]
[Route("[controller]")]
public class StockController : ControllerBase
{
    readonly IMediator _mediator;

    public StockController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(object))]
    public async Task<IActionResult> GetStockList([FromBody] GetStockListQuery query, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(query, cancellationToken);

        return Ok(result);
    }
}
