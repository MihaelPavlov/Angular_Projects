using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TRINV.Application.Commands.Investment;
using TRINV.Application.Queries.Investment;
using TRINV.Shared.Business.Utilities;

namespace TRINV.InvestTrackApplication.Controllers;

[Route("[controller]")]
[ApiController]
[AllowAnonymous]
public class InvestmentsController : Controller
{
    readonly IMediator _mediator;

    public InvestmentsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult<GetInvestmentListQueryModel>))]
    public async Task<IActionResult> GetInvestmentList(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetInvestmentListQuery(), cancellationToken);
        return Ok(result);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult<GetInvestmentByIdQueryModel>))]
    public async Task<IActionResult> GetInvestmentById(int id,CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetInvestmentByIdQuery(id), cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult))]
    public async Task<IActionResult> CreateInvestment([FromBody] CreateInvestmentCommand request, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult))]
    public async Task<IActionResult> UpdateInvestment([FromBody] UpdateInvestmentCommand request, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OperationResult))]
    public async Task<IActionResult> DeleteInvestment(int id, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new DeleteInvestmentCommand(id), cancellationToken);
        return Ok(result);
    }
}
