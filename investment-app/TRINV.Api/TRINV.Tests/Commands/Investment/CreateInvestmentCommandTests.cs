namespace TRINV.UnitTests.Commands.Investment;

using System.ComponentModel.DataAnnotations;
using Application.Interfaces;
using Application.Commands.Investment;
using Domain.Entities;
using Domain.Enums;
using Moq;

public class CreateInvestmentCommandTests
{ 
    readonly Mock<IRepository<Investment>> _investmentRepositoryMock;
    readonly Mock<IUnitOfWork> _unitOfWorkMock;
    readonly Mock<IUserContext> _userContextMock;

    public CreateInvestmentCommandTests()
    {
        _unitOfWorkMock = new();
        _investmentRepositoryMock = new();
        _userContextMock = new();
    }

    [SetUp]
    public void Setup()
    {
    }

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
        //Arrange
        var command = new CreateInvestmentCommand
        {
            AssetId = "",
            Name = null,
            Quantity = 0,
            PurchasePrice = 0,
            PurchasePricePerUnit = 0,
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
        Assert.IsNotNull(result.ValidationErrors);
    }
}