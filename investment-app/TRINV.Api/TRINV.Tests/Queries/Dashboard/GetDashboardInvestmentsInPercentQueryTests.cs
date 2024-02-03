namespace TRINV.UnitTests.Queries.Dashboard;

using Application.Interfaces;
using Application.Queries.Dashboard;
using Domain.Entities;
using Domain.Enums;
using Moq;

[TestFixture]
public class GetDashboardInvestmentsInPercentQueryTests
{
    readonly Mock<IRepository<Investment>> _repositoryMock = new();
    readonly Mock<IUserContext> _userContextMock = new();

    [Test]
    public async Task Handle_WithNoInvestments_ShouldReturnEmptyResult()
    {
        // Arrange
        _repositoryMock.Setup(
                repo => repo.GetAllWithPredicateAsync(
                It.IsAny<Func<Investment, bool>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<Investment>());

        var handler = new GetDashboardInvestmentsInPercentQueryHandler(
            _repositoryMock.Object,
            _userContextMock.Object);

        // Act
        var result = await handler.Handle(
            new GetDashboardInvestmentsInPercentQuery(InvestmentType.Stock), CancellationToken.None);

        // Assert
        Assert.IsTrue(result.Success);
        Assert.That(result.RelatedObject, Is.Null);
    }

    [Test]
    public async Task Handle_WithInvestments_ShouldReturnResultWithPercentages()
    {
        // Arrange
        var investments = new List<Investment>
        {
            new Investment { AssetId = "ABC", Name = "ABC Stock", Quantity = 10, PurchasePrice = 100 },
            new Investment { AssetId = "XYZ", Name = "XYZ Stock", Quantity = 5, PurchasePrice = 50 },
        };

        _repositoryMock.Setup(
                repo => repo.GetAllWithPredicateAsync(
                    It.IsAny<Func<Investment, bool>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(investments);

        var handler = new GetDashboardInvestmentsInPercentQueryHandler(
            _repositoryMock.Object,
            _userContextMock.Object);

        // Act
        var result = await handler.Handle(
            new GetDashboardInvestmentsInPercentQuery(InvestmentType.Stock), CancellationToken.None);

        // Assert
        Assert.IsTrue(result.Success);
        Assert.That(result.RelatedObject, Is.Not.Empty);
    }
}
