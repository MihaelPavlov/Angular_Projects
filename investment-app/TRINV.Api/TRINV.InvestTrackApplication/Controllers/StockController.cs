using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TRINV.Application.Queries.Stock;
using TRINV.Shared.Business.Utilities;

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
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult<List<GetStockListQueryModel>>))]
    public async Task<IActionResult> GetStockList([FromBody] GetStockListQuery query, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(query, cancellationToken);

        return Ok(result);
    }
}
