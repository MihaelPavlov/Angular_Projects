namespace TRINV.UnitTests.Commands.Investment;

using System.ComponentModel.DataAnnotations;
using Application.Interfaces;
using Application.Commands.Investment;
using Domain.Entities;
using Domain.Enums;
using Moq;

[TestFixture]
public class CreateInvestmentCommandTests
{
    readonly Mock<IRepository<Investment>> _investmentRepositoryMock = new();
    readonly Mock<IUnitOfWork> _unitOfWorkMock = new();
    readonly Mock<IUserContext> _userContextMock = new();

    [Test]
    public async Task Handle_Should_Create_NewInvestment()
    {
        //Arrange
        var command = new CreateInvestmentCommand
        {
            AssetId = "Asset123",
            Name = "Test Investment",
            Quantity = 10,
            PurchasePrice = 1000,
            PurchasePricePerUnit = 100,
            InvestmentType = InvestmentType.Stock,
            IsFromOutsideProvider = false
        };

        var handler = new CreateInvestmentCommandHandler(
            _investmentRepositoryMock.Object,
            _unitOfWorkMock.Object,
            _userContextMock.Object);

        //Act
        var result = await handler.Handle(command, default);

        //Assert
        Assert.That(result.Success, Is.True);

        _investmentRepositoryMock.Verify(
            x => x.AddAsync(
                It.IsAny<Investment>(), It.IsAny<CancellationToken>()), Times.Once);

        _unitOfWorkMock.Verify(
            x => x.SaveChangesAsync(
                It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test]
    public async Task Handle_Should_Throw_ValidationException()
    {
        // Arrange
        var command = new CreateInvestmentCommand
        {
            AssetId = null,
            Name = "Some name",
            Quantity = 0,
            PurchasePrice = 0,
            PurchasePricePerUnit = 0,
            InvestmentType = InvestmentType.Stock,
            IsFromOutsideProvider = false
        };

        var validationContext = new ValidationContext(command, null, null);
        var validationResults = new List<ValidationResult>();

        var handler = new CreateInvestmentCommandHandler(
            _investmentRepositoryMock.Object,
            _unitOfWorkMock.Object,
            _userContextMock.Object);

        // Act
        bool isValid = Validator.TryValidateObject(command, validationContext, validationResults, true);

        // Assert
        Assert.IsFalse(isValid);
        Assert.AreEqual(1, validationResults.Count);

        var validationResult = validationResults[0];
        Assert.AreEqual("The AssetId field is required.", validationResult.ErrorMessage);
        CollectionAssert.Contains(validationResult.MemberNames, "AssetId");
    }
}
