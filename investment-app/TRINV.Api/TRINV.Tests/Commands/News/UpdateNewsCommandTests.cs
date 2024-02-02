namespace TRINV.UnitTests.Commands.News;

using Application.Commands.News;
using Application.Interfaces;
using Domain.Entities;
using Moq;

[TestFixture]
public class UpdateNewsCommandHandlerTests
{
    [Test]
    public async Task Handle_ValidCommand_UpdatesNewsAndReturnsSuccess()
    {
        // Arrange
        int validNewsId = 1;
        var validNewsName = "Updated News";
        var validNewsDescription = "Updated News Description";
        var validShortDescription = "Short Description";
        var validImageUrl = "https://example.com/image.jpg";
        var validTimeToRead = 5;

        var mockRepository = new Mock<IRepository<News>>();
        var mockUnitOfWork = new Mock<IUnitOfWork>();

        // Assume the repository returns a valid news when GetByIdAsync is called
        mockRepository.Setup(
                repo => repo.GetByIdAsync(
                    validNewsId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new News {Id = validNewsId});

        var handler = new UpdateNewsCommandHandler(mockRepository.Object, mockUnitOfWork.Object);
        var command = new UpdateNewsCommand
        {
            Id = validNewsId,
            Name = validNewsName,
            Description = validNewsDescription,
            ShortDescription = validShortDescription,
            ImageUrl = validImageUrl,
            TimeToRead = validTimeToRead
        };

        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        // Verify that GetByIdAsync, Update, and SaveChangesAsync methods were called once
        mockRepository.Verify(
            repo => repo.GetByIdAsync(
                validNewsId, It.IsAny<CancellationToken>()), Times.Once);

        mockRepository.Verify(
            repo => repo.Update(It.IsAny<News>()), Times.Once);

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
        mockRepository.Setup(repo => repo.GetByIdAsync(invalidNewsId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((News)null);

        var handler = new UpdateNewsCommandHandler(mockRepository.Object, mockUnitOfWork.Object);
        var command = new UpdateNewsCommand { Id = invalidNewsId };

        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        // Verify that GetByIdAsync was called once
        mockRepository.Verify(
            repo => repo.GetByIdAsync(
                invalidNewsId, It.IsAny<CancellationToken>()), Times.Once);

        // Verify that Update and SaveChangesAsync methods were not called
        mockRepository.Verify(
            repo => repo.Update(It.IsAny<News>()), Times.Never);

        mockUnitOfWork.Verify(
            uow => uow.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Never);

        // Ensure the result is not successful and contains the expected error message
        Assert.IsFalse(result.Success);
        Assert.IsNotNull(result.InitialException);
        Assert.That(result.InitialException.Message, Is.EqualTo($"{nameof(News)} with Id {invalidNewsId} was not found."));
    }
}