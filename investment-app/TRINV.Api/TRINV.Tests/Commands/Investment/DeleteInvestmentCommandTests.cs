namespace TRINV.UnitTests.Commands.Investment;

using Application.Interfaces;
using Domain.Entities;
using TRINV.Application.Commands.Investment;
using Moq;
using System.Threading.Tasks;

[TestFixture]
internal class DeleteInvestmentCommandTests
{
    readonly Mock<IRepository<Investment>> _investmentRepositoryMock;
    readonly Mock<IUnitOfWork> _unitOfWorkMock;

    public DeleteInvestmentCommandTests()
    {
        _unitOfWorkMock = new();
        _investmentRepositoryMock = new();
    }

    [SetUp]
    public void Setup()
    {
    }

    [Test]
    public async Task Handle_ValidId_DeletesInvestmentAndReturnsSuccess()
    {
        // Arrange
        int validInvestmentId = 1;
        var mockRepository = new Mock<IRepository<Investment>>();
        var mockUnitOfWork = new Mock<IUnitOfWork>();

        // Assume the repository returns a valid investment when GetByIdAsync is called
        mockRepository.Setup(repo => repo.GetByIdAsync(
                validInvestmentId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new Investment { Id = validInvestmentId });

        var handler = new DeleteInvestmentCommandHandler(mockRepository.Object, mockUnitOfWork.Object);
        var command = new DeleteInvestmentCommand(validInvestmentId);

        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        // Verify that GetByIdAsync and Delete methods were called once
        mockRepository.Verify(repo => repo.GetByIdAsync(
            validInvestmentId, It.IsAny<CancellationToken>()), Times.Once);

        mockRepository.Verify(
            repo => repo.Delete(It.IsAny<Investment>()), Times.Once);

        mockUnitOfWork.Verify(
            uow => uow.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);

        // Ensure the result is successful
        Assert.IsTrue(result.Success);
        Assert.IsNull(result.InitialException);
    }


    [Test]
    public async Task Handle_InvalidId_ReturnsErrorResult()
    {
        // Arrange
        int invalidInvestmentId = 999;
        var mockRepository = new Mock<IRepository<Domain.Entities.Investment>>();
        var mockUnitOfWork = new Mock<IUnitOfWork>();

        // Assume the repository returns null when GetByIdAsync is called with an invalid id
        mockRepository.Setup(
                repo => repo
                    .GetByIdAsync(invalidInvestmentId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((Investment)null);

        var handler = new DeleteInvestmentCommandHandler(mockRepository.Object, mockUnitOfWork.Object);
        var command = new DeleteInvestmentCommand(invalidInvestmentId);

        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        // Verify that GetByIdAsync was called once
        mockRepository.Verify(
            repo => repo.GetByIdAsync(
                invalidInvestmentId, It.IsAny<CancellationToken>()), Times.Once);

        // Verify that Delete and SaveChangesAsync methods were not called
        mockRepository.Verify(
            repo => repo.Delete(
                It.IsAny<Domain.Entities.Investment>()), Times.Never);

        mockUnitOfWork.Verify(
            uow => uow.SaveChangesAsync(
                It.IsAny<CancellationToken>()), Times.Never);

        // Ensure the result is not successful and contains the expected error message
        Assert.IsFalse(result.Success);
        Assert.IsNotNull(result.InitialException);
        Assert.That(result.InitialException.Message, Is.EqualTo($"{typeof(Investment)} with Id: {command.Id} was not found!"));
    }
}
