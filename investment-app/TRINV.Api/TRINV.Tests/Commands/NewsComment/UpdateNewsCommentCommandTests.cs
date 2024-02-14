namespace TRINV.UnitTests.Commands.NewsComment;

using Application.Commands.NewsComment;
using Application.Interfaces;
using Domain.Entities;
using Moq;

[TestFixture]
public class UpdateNewsCommentCommandTests
{
    [Test]
    public async Task Handle_ValidCommand_UpdatesNewsCommentAndReturnsSuccess()
    {
        // Arrange
        int validNewsCommentId = 1;
        string validComment = "Updated Comment";

        var mockUnitOfWork = new Mock<IUnitOfWork>();
        var mockNewsCommentRepository = new Mock<IRepository<NewsComment>>();

        // Assume the repository returns a valid news comment when GetByIdAsync is called
        mockNewsCommentRepository.Setup(
                repo => repo.GetByIdAsync(
                    validNewsCommentId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new NewsComment {Id = validNewsCommentId});

        var handler = new UpdateNewsCommentCommandHandler(mockUnitOfWork.Object, mockNewsCommentRepository.Object);
        var command = new UpdateNewsCommentCommand
        {
            NewsCommentId = validNewsCommentId,
            Comment = validComment
        };

        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        // Verify that GetByIdAsync, Update, and SaveChangesAsync methods were called once
        mockNewsCommentRepository.Verify(repo => repo.GetByIdAsync(
            validNewsCommentId, It.IsAny<CancellationToken>()), Times.Once);

        mockNewsCommentRepository.Verify(
            repo => repo.Update(It.IsAny<NewsComment>()), Times.Once);

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

        var handler = new UpdateNewsCommentCommandHandler(mockUnitOfWork.Object, mockNewsCommentRepository.Object);
        var command = new UpdateNewsCommentCommand { NewsCommentId = invalidNewsCommentId };

        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        // Verify that GetByIdAsync was called once
        mockNewsCommentRepository.Verify(
            repo => repo.GetByIdAsync(
                invalidNewsCommentId, It.IsAny<CancellationToken>()), Times.Once);

        // Verify that Update and SaveChangesAsync methods were not called
        mockNewsCommentRepository.Verify(
            repo => repo.Update(It.IsAny<NewsComment>()), Times.Never);

        mockUnitOfWork.Verify(
            uow => uow.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Never);

        // Ensure the result is not successful and contains the expected error message
        Assert.IsFalse(result.Success);
        Assert.IsNotNull(result.InitialException);
        Assert.That(result.InitialException.Message, Is.EqualTo($"{typeof(NewsComment)} with Id: {command.NewsCommentId} was not found!"));
    }
}