namespace TRINV.UnitTests.Queries.Dashboard;

using Application.Interfaces;
using Application.Queries.Dashboard;
using Domain.Entities;
using Domain.Enums;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

[TestFixture]
public class GetUserLatestInvestmentsQueryTests
{
    readonly Mock<IRepository<Investment>> _investmentRepositoryMock = new();
    readonly Mock<IUserContext> _userContextMock = new();

    [Test]
    public async Task Handle_WithNoInvestments_ShouldReturnEmptyResult()
    {
        // Arrange
        _userContextMock.Setup(userContext => userContext.UserId).Returns(1);

        _investmentRepositoryMock.Setup(
                repo => repo.GetAllWithPredicateAsync(
                It.IsAny<Func<Investment, bool>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<Investment>());

        var handler = new GetUserLatestInvestmentsQueryHandler(
            _investmentRepositoryMock.Object,
            _userContextMock.Object);

        // Act
        var result = await handler.Handle(new GetUserLatestInvestmentsQuery(InvestmentType.Stock), CancellationToken.None);

        // Assert
        Assert.IsTrue(result.Success);
        Assert.That(result.RelatedObject, Is.Empty);
    }

    [Test]
    public async Task Handle_WithInvestments_ShouldReturnInvestmentsSortedByDate()
    {
        // Arrange
        var investments = new List<Investment>
        {
            new Investment { AssetId = "AAPL", Name = "Apple", Quantity = 10, PurchasePrice = 1500, CreatedOn = DateTime.Now.AddDays(-5) },
            new Investment { AssetId = "GOOGL", Name = "Alphabet", Quantity = 5, PurchasePrice = 2500, CreatedOn = DateTime.Now.AddDays(-2) },
        };

        _userContextMock.Setup(userContext => userContext.UserId).Returns(1);

        _investmentRepositoryMock.Setup(repo => repo
            .GetAllWithPredicateAsync(It.IsAny<Func<Investment, bool>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(investments);

        var handler = new GetUserLatestInvestmentsQueryHandler(
            _investmentRepositoryMock.Object,
            _userContextMock.Object);

        // Act
        var result = await handler.Handle(new GetUserLatestInvestmentsQuery(InvestmentType.Stock), CancellationToken.None);

        // Assert
        Assert.IsTrue(result.Success);
        Assert.That(result.RelatedObject, Is.Not.Empty);
        Assert.That(result.RelatedObject.First().AssetId, Is.EqualTo("GOOGL"));
        Assert.That(result.RelatedObject.Last().AssetId, Is.EqualTo("AAPL"));
    }
}

