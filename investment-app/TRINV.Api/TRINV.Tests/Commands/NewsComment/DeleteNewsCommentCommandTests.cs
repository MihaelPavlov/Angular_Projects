namespace TRINV.UnitTests.Commands.NewsComment;

using Domain.Entities;
using Moq;
using Application.Commands.NewsComment;
using Application.Interfaces;

[TestFixture]
public class DeleteNewsCommentCommandTests
{
    [Test]
    public async Task Handle_ValidId_DeletesNewsCommentAndReturnsSuccess()
    {
        // Arrange
        int validNewsCommentId = 1;
        var mockUnitOfWork = new Mock<IUnitOfWork>();
        var mockNewsCommentRepository = new Mock<IRepository<NewsComment>>();

        // Assume the repository returns a valid news comment when GetByIdAsync is called
        mockNewsCommentRepository.Setup(
                repo => repo.GetByIdAsync(
                    validNewsCommentId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new NewsComment {Id = validNewsCommentId});

        var handler = new DeleteNewsCommentCommandHandler(mockUnitOfWork.Object, mockNewsCommentRepository.Object);
        var command = new DeleteNewsCommentCommand(validNewsCommentId);

        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        // Verify that GetByIdAsync, Delete, and SaveChangesAsync methods were called once
        mockNewsCommentRepository.Verify(
            repo => repo.GetByIdAsync(
                validNewsCommentId, It.IsAny<CancellationToken>()), Times.Once);

        mockNewsCommentRepository.Verify(
            repo => repo.Delete(It.IsAny<NewsComment>()), Times.Once);

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
        int invalidNewsCommentId = 999;
        var mockUnitOfWork = new Mock<IUnitOfWork>();
        var mockNewsCommentRepository = new Mock<IRepository<NewsComment>>();

        // Assume the repository returns null when GetByIdAsync is called with an invalid id
        mockNewsCommentRepository.Setup(
                repo => repo.GetByIdAsync(
                    invalidNewsCommentId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((NewsComment)null);

        var handler = new DeleteNewsCommentCommandHandler(mockUnitOfWork.Object, mockNewsCommentRepository.Object);
        var command = new DeleteNewsCommentCommand(invalidNewsCommentId);

        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        // Verify that GetByIdAsync was called once
        mockNewsCommentRepository.Verify(
            repo => repo.GetByIdAsync(
                invalidNewsCommentId, It.IsAny<CancellationToken>()), Times.Once);

        // Verify that Delete and SaveChangesAsync methods were not called
        mockNewsCommentRepository.Verify(
            repo => repo.Delete(
                It.IsAny<NewsComment>()), Times.Never);

        mockUnitOfWork.Verify(
            uow => uow.SaveChangesAsync(
                It.IsAny<CancellationToken>()), Times.Never);

        // Ensure the result is not successful and contains the expected error message
        Assert.IsFalse(result.Success);
        Assert.IsNotNull(result.InitialException);
        Assert.That(result.InitialException.Message, Is.EqualTo($"{typeof(NewsComment)} with Id: {command.Id} was not found!"));
    }
}
