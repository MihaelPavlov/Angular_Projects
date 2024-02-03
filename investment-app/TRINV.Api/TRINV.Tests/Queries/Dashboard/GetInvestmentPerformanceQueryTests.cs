namespace TRINV.UnitTests.Queries.Dashboard;

using Application.Interfaces;
using Application.Queries.Dashboard;
using Application.Queries.DigitalCurrency;
using Domain.Entities;
using Domain.Enums;
using Shared.Business.Utilities;
using MediatR;
using Moq;

[TestFixture]
public class GetInvestmentPerformanceQueryTests
{
    readonly Mock<IRepository<Investment>> _investmentRepositoryMock = new();
    readonly Mock<IUserContext> _userContextMock = new();
    readonly Mock<IMediator> _mediatorMock = new();

    [Test]
    public async Task Handle_WithNoCryptoInvestments_ShouldReturnEmptyResult()
    {
        // Arrange
        _userContextMock.Setup(userContext => userContext.UserId).Returns(1);

        _investmentRepositoryMock.Setup(
                repo => repo.GetAllWithPredicateAsync(
                    It.IsAny<Func<Investment, bool>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<Investment>());

        var handler = new GetInvestmentPerformanceQueryHandler(
            _investmentRepositoryMock.Object,
            _userContextMock.Object,
            _mediatorMock.Object);

        // Act
        var result = await handler.Handle(new GetInvestmentPerformanceQuery(InvestmentType.Stock), CancellationToken.None);

        // Assert
        Assert.IsFalse(result.Success);
        Assert.That(result.RelatedObject, Is.Null);
    }

    [Test]
    public async Task Handle_WithCryptoInvestments_ShouldReturnInvestmentPerformanceList()
    {
        // Arrange
        var investments = new List<Investment>
        {
            new Investment { AssetId = "BTC", Name = "Bitcoin", Quantity = 1, PurchasePrice = 50000 },
            new Investment { AssetId = "ETH", Name = "Ethereum", Quantity = 2, PurchasePrice = 3000 },
        };

        _userContextMock.Setup(userContext => userContext.UserId).Returns(1);

        _investmentRepositoryMock.Setup(
                repo => repo.GetAllWithPredicateAsync(
                    It.IsAny<Func<Investment, bool>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(investments);

        _mediatorMock.Setup(mediator => mediator.Send(
                It.IsAny<GetDigitalCurrencyListQuery>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new OperationResult<List<GetDigitalCurrencyModel>>
            {
                Success = true,
                RelatedObject = new List<GetDigitalCurrencyModel>
                {
                    new GetDigitalCurrencyModel { Symbol = "BTC", PriceUsd = "55000" },
                    new GetDigitalCurrencyModel { Symbol = "ETH", PriceUsd = "3200" },
                }
            });

        var handler = new GetInvestmentPerformanceQueryHandler(
            _investmentRepositoryMock.Object,
            _userContextMock.Object,
            _mediatorMock.Object);

        // Act
        var result = await handler.Handle(new GetInvestmentPerformanceQuery(InvestmentType.Cryptocurrency), CancellationToken.None);

        // Assert
        Assert.IsTrue(result.Success);
        Assert.That(result.RelatedObject, Is.Not.Empty);
    }
}
