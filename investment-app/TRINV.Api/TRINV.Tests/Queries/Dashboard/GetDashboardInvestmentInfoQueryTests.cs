namespace TRINV.UnitTests.Queries.Dashboard;

using Application.Interfaces;
using Application.Queries.Dashboard;
using Application.Queries.DigitalCurrency;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.Extensions.Logging;
using Moq;
using Shared.Business.Logger;
using Shared.Business.Utilities;

[TestFixture]
public class GetDashboardInvestmentsInfoQueryTests
{
    readonly Mock<IRepository<Investment>> _repositoryMock = new();
    readonly Mock<IMediator> _mediatorMock = new();
    readonly Mock<IUserContext> _userContextMock = new();
    readonly Mock<ILoggerService> _loggerMock = new();

    [Test]
    public async Task Handle_WithValidInvestments_ShouldReturnValidResult()
    {
        // Arrange
        var investments = new List<Investment>
            {
                new Investment { AssetId = "BTC", Quantity = 1, PurchasePricePerUnit = 40000 },
                new Investment { AssetId = "ETH", Quantity = 2, PurchasePricePerUnit = 2000 }
            };

        _repositoryMock.Setup(repo => repo.GetAllWithPredicateAsync(It.IsAny<Func<Domain.Entities.Investment, bool>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(investments);

        _mediatorMock.Setup(mediator => mediator.Send(
                It.IsAny<GetDigitalCurrencyListQuery>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new OperationResult<List<GetDigitalCurrencyModel>>()
            {
                Success = true, RelatedObject = new List<GetDigitalCurrencyModel>
                {
                    new GetDigitalCurrencyModel { Symbol = "BTC", PriceUsd = "42000" }
                }
            });

        var handler = new GetDashboardInvestmentsInfoQueryHandler(
            _repositoryMock.Object,
            _userContextMock.Object,
            _mediatorMock.Object,
            _loggerMock.Object);

        // Act
        var result = await handler.Handle(new GetDashboardInvestmentsInfoQuery(InvestmentType.Cryptocurrency), CancellationToken.None);

        // Assert
        Assert.IsTrue(result.Success);
        Assert.IsNotNull(result.RelatedObject);

        var queryModel = result.RelatedObject;
        Assert.That(queryModel.TotalInvestmentAmount, Is.EqualTo(0)); // (1 * 40000) + (2 * 2000)
        Assert.That(queryModel.TotalInvestments, Is.EqualTo(2));
        Assert.That(queryModel.RateOfReturn, Is.EqualTo(5)); // ((2 * 42000) - (1 * 40000 + 2 * 2000)) / (1 * 40000 + 2 * 2000) * 100
    }

    [Test]
    public async Task Handle_WithNoInvestments_ShouldReturnEmptyResult()
    {
        // Arrange
        _repositoryMock.Setup(
                repo => repo.GetAllWithPredicateAsync(It.IsAny<Func<Investment, bool>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<Investment>());

        var handler = new GetDashboardInvestmentsInfoQueryHandler(
            _repositoryMock.Object,
            _userContextMock.Object,
            _mediatorMock.Object,
            _loggerMock.Object);

        // Act
        var result = await handler.Handle(
            new GetDashboardInvestmentsInfoQuery(InvestmentType.Cryptocurrency), CancellationToken.None);

        // Assert
        Assert.IsTrue(result.Success);
        Assert.IsNull(result.RelatedObject);
    }

    [Test]
    public async Task Handle_WithInvalidInvestmentType_ShouldReturnInfrastructureException()
    {
        // Arrange
        var dummyInvestments = new List<Investment>
        {
            new Investment { UserId = 1, InvestmentType = InvestmentType.Cryptocurrency }
        };

        _repositoryMock.Setup(
                repo => repo.GetAllWithPredicateAsync(
                    It.IsAny<Func<Investment, bool>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(dummyInvestments);

        var handler = new GetDashboardInvestmentsInfoQueryHandler(
            _repositoryMock.Object,
            _userContextMock.Object,
            _mediatorMock.Object,
            _loggerMock.Object);

        // Act
        var result = await handler.Handle(
            new GetDashboardInvestmentsInfoQuery(InvestmentType.Stock), CancellationToken.None);

        // Assert
        Assert.IsFalse(result.Success);
        Assert.IsNotNull(result.InitialException);
    }

    [Test]
    public async Task Handle_WithCryptoCoinsFetchFailure_ShouldReturnInfrastructureException()
    {
        // Arrange

        var dummyInvestments = new List<Investment>
        {
            new Investment { UserId = 1, InvestmentType = InvestmentType.Cryptocurrency }
        };

        _repositoryMock.Setup(
                repo => repo.GetAllWithPredicateAsync(
                    It.IsAny<Func<Investment, bool>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(dummyInvestments);

        _mediatorMock.Setup(
                mediator => mediator.Send(
                    It.IsAny<GetDigitalCurrencyListQuery>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new OperationResult<List<GetDigitalCurrencyModel>> { Success = false });

        var handler = new GetDashboardInvestmentsInfoQueryHandler(
            _repositoryMock.Object,
            _userContextMock.Object,
            _mediatorMock.Object,
            _loggerMock.Object);

        // Act
        var result = await handler.Handle(
            new GetDashboardInvestmentsInfoQuery(InvestmentType.Cryptocurrency), CancellationToken.None);

        // Assert
        _mediatorMock.Verify(x => x.Send(
            It.IsAny<GetDigitalCurrencyListQuery> (), It.IsAny<CancellationToken>()), Times.Once());

        Assert.IsFalse(result.Success);
        Assert.IsNotNull(result.InitialException);
    }
}
