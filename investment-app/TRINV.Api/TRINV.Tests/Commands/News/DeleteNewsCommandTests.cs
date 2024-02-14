namespace TRINV.UnitTests.Commands.News;

using Domain.Entities;
using Moq;
using TRINV.Application.Commands.News;
using TRINV.Application.Interfaces;

[TestFixture]
public class DeleteNewsCommandHandlerTests
{
    [Test]
    public async Task Handle_ValidId_DeletesNewsAndReturnsSuccess()
    {
        // Arrange
        int validNewsId = 1;
        var mockRepository = new Mock<IRepository<News>>();
        var mockUnitOfWork = new Mock<IUnitOfWork>();

        // Assume the repository returns a valid news when GetByIdAsync is called
        mockRepository.Setup(
                repo => repo.GetByIdAsync(
                    validNewsId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new News {Id = validNewsId});

        var handler = new DeleteNewsCommandHandler(mockRepository.Object, mockUnitOfWork.Object);
        var command = new DeleteNewsCommand(validNewsId);

        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        // Verify that GetByIdAsync and Delete methods were called once
        mockRepository.Verify(repo => repo.GetByIdAsync(validNewsId, It.IsAny<CancellationToken>()), Times.Once);
        mockRepository.Verify(
            repo => repo.Delete(It.IsAny<News>()), Times.Once);

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
        int invalidNewsId = 999;
        var mockRepository = new Mock<IRepository<News>>();
        var mockUnitOfWork = new Mock<IUnitOfWork>();

        // Assume the repository returns null when GetByIdAsync is called with an invalid id
        mockRepository.Setup(
                repo => repo.GetByIdAsync(
                    invalidNewsId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((News)null);

        var handler = new DeleteNewsCommandHandler(mockRepository.Object, mockUnitOfWork.Object);
        var command = new DeleteNewsCommand(invalidNewsId);

        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        // Verify that GetByIdAsync was called once
        mockRepository.Verify(repo => repo.GetByIdAsync(invalidNewsId, It.IsAny<CancellationToken>()), Times.Once);
        // Verify that Delete and SaveChangesAsync methods were not called
        mockRepository.Verify(repo => repo.Delete(It.IsAny<News>()), Times.Never);
        mockUnitOfWork.Verify(uow => uow.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Never);

        // Ensure the result is not successful and contains the expected error message
        Assert.IsFalse(result.Success);
        Assert.IsNotNull(result.InitialException);
        Assert.That(result.InitialException.Message, Is.EqualTo($"{nameof(News)} with Id {invalidNewsId} was not found."));
    }
}
