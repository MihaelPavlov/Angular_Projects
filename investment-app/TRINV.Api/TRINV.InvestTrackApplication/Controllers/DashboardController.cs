using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TRINV.Application.Queries.Dashboard;
using TRINV.Shared.Business.Utilities;

namespace TRINV.InvestTrackApplication.Controllers;

using Domain.Enums;

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
    public async Task<IActionResult> GetInvestmentsInPercents([FromQuery] GetDashboardInvestmentsInPercentQuery query, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(query, cancellationToken);
        return Ok(result);
    }

    [HttpGet("get-investment-performance-list")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult<IList<InvestmentPerformanceQueryModel>>))]
    public async Task<IActionResult> GetUserInvestmentsPerformance(InvestmentType investmentType, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetInvestmentPerformanceQuery(investmentType), cancellationToken);
        return Ok(result);
    }

    [HttpGet("get-latest-investments")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult<IList<GetUserLatestInvestmentsQueryModel>>))]
    public async Task<IActionResult> GetUserLatestInvestments(InvestmentType investmentType, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetUserLatestInvestmentsQuery(investmentType), cancellationToken);
        return Ok(result);
    }
}
