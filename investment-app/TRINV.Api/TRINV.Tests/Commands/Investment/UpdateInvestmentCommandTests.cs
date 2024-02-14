namespace TRINV.UnitTests.Commands.Investment;

using Domain.Entities;
using Moq;
using TRINV.Application.Commands.Investment;
using TRINV.Application.Interfaces;

[TestFixture]
public class UpdateInvestmentCommandHandlerTests
{
    [Test]
    public async Task Handle_ValidCommand_UpdatesInvestmentAndReturnsSuccess()
    {
        // Arrange
        var validInvestmentId = 1;
        var validQuantity = 100;
        var validPurchasePrice = 500;
        var validPurchasePricePerUnit = 5;

        var mockRepository = new Mock<IRepository<Investment>>();
        var mockUnitOfWork = new Mock<IUnitOfWork>();

        // Assume the repository returns a valid investment when GetByIdAsync is called
        mockRepository.Setup(
                repo => repo.GetByIdAsync(
                    validInvestmentId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new Investment {Id = validInvestmentId});

        var handler = new UpdateInvestmentCommandHandler(mockRepository.Object, mockUnitOfWork.Object);
        var command = new UpdateInvestmentCommand
        {
            Id = validInvestmentId,
            Quantity = validQuantity,
            PurchasePrice = validPurchasePrice,
            PurchasePricePerUnit = validPurchasePricePerUnit
        };

        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        // Verify that GetByIdAsync, Update, and SaveChangesAsync methods were called once
        mockRepository.Verify(repo => repo.GetByIdAsync(
            validInvestmentId, It.IsAny<CancellationToken>()), Times.Once);

        mockRepository.Verify(repo => repo.Update(
            It.IsAny<Investment>()), Times.Once);

        mockUnitOfWork.Verify(uow => uow.SaveChangesAsync(
            It.IsAny<CancellationToken>()), Times.Once);

        // Ensure the result is successful
        Assert.IsTrue(result.Success);
        Assert.IsNull(result.InitialException);
    }

    [Test]
    public async Task Handle_InvalidId_ReturnsErrorResult()
    {
        // Arrange
        var invalidInvestmentId = 999;
        var mockRepository = new Mock<IRepository<Investment>>();
        var mockUnitOfWork = new Mock<IUnitOfWork>();

        // Assume the repository returns null when GetByIdAsync is called with an invalid id
        mockRepository.Setup(repo => repo.GetByIdAsync(invalidInvestmentId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((Investment)null);

        var handler = new UpdateInvestmentCommandHandler(mockRepository.Object, mockUnitOfWork.Object);
        var command = new UpdateInvestmentCommand { Id = invalidInvestmentId };

        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        // Verify that GetByIdAsync was called once
        mockRepository.Verify(repo => repo.GetByIdAsync(invalidInvestmentId, It.IsAny<CancellationToken>()), Times.Once);
        // Verify that Update and SaveChangesAsync methods were not called
        mockRepository.Verify(repo => repo.Update(It.IsAny<Domain.Entities.Investment>()), Times.Never);
        mockUnitOfWork.Verify(uow => uow.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Never);

        // Ensure the result is not successful and contains the expected error message
        Assert.IsFalse(result.Success);
        Assert.IsNotNull(result.InitialException);
        Assert.That(result.InitialException.Message, Is.EqualTo($"{nameof(Investment)} with Id {command.Id} was not found!"));
    }
}
