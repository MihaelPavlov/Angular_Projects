using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TRINV.Application.Queries.Dashboard;
using TRINV.Shared.Business.Utilities;

namespace TRINV.InvestTrackApplication.Controllers;

[ApiController]
[AllowAnonymous]
[Route("[controller]")]
public class DashboardController : Controller
{
    readonly IMediator _mediator;

    public DashboardController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("get-investments-info")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult<GetDashboardInvestmentsInfoQueryModel>))]
    public async Task<IActionResult> GetInvestmentsInfo([FromQuery] GetDashboardInvestmentsInfoQuery request, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }

    [HttpGet("get-investments-in-percent")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult<IList<GetDashboardInvestmentsInPercentQueryModel>>))]
    public async Task<IActionResult> GetInvesmentsInPercents([FromQuery] GetDashboardInvestmentsInPercentQuery query, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(query, cancellationToken);
        return Ok(result);
    }

    [HttpGet("get-investments-performance")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult<IList<InvestmentPerformanceQueryModel>>))]
    public async Task<IActionResult> GetUserInvestmentsPerformance(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetInvestmentPerformanceQuery(), cancellationToken);
        return Ok(result);
    }

    [HttpGet("get-latest-investments")]
    [ProducesResponseType(StatusCodes.Status200OK,
        Type = typeof(OperationResult<IList<GetUserLatestInvestmentsQueryModel>>))]
    public async Task<IActionResult> GetUserLatestInvestments(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetUserLatestInvestmentsQuery(), cancellationToken);
        return Ok(result);
    }
}
