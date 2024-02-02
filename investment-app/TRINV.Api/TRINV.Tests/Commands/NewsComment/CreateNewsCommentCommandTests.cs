namespace TRINV.UnitTests.Commands.NewsComment;

using Application.Commands.NewsComment;
using Application.Interfaces;
using Domain.Entities;
using Moq;

public class CreateNewsCommentCommandTests
{
    readonly Mock<IRepository<NewsComment>> _newsCommentRepositoryMock;
    readonly Mock<IRepository<News>> _newsRepositoryMock;
    readonly Mock<IUnitOfWork> _unitOfWorkMock;
    readonly Mock<IUserContext> _userContextMock;

    public CreateNewsCommentCommandTests()
    {
        _unitOfWorkMock = new();
        _newsCommentRepositoryMock = new();
        _userContextMock = new();
        _newsRepositoryMock = new();
    }

    [SetUp]
    public void Setup()
    {
    }

    [Test]
    public async Task Handle_Should_NotCreate_NewNewsComment_IfNoNewsIdIsProvided()
    {
        //Arrange
        var command = new CreateNewsCommentCommand();

        var handler = new CreateNewsCommentCommandHandler(
            _unitOfWorkMock.Object,
            _userContextMock.Object,
            _newsCommentRepositoryMock.Object,
            _newsRepositoryMock.Object);

        //Act
        var result = await handler.Handle(command, default);

        //Assert
        Assert.That(result.Success, Is.False);

        _newsCommentRepositoryMock.Verify(x => x.AddAsync(
            It.IsAny<NewsComment>(), It.IsAny<CancellationToken>()), Times.Never);

        _unitOfWorkMock.Verify(x => x.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Never);
    }


    [Test]
    public async Task Handle_Should_Return_NotFoundException_IfNewsWithProvidedIdNotFound()
    {
        //Arrange
        var command = new CreateNewsCommentCommand
        {
            NewsId = 1,
            Comment = "Test Comment"
        };

        _newsRepositoryMock.Setup(x => x
                .GetByIdAsync(
                    It.IsAny<int>(),
                    It.IsAny<CancellationToken>()))
                .ReturnsAsync((News)null);


        var handler = new CreateNewsCommentCommandHandler(
            _unitOfWorkMock.Object,
            _userContextMock.Object,
            _newsCommentRepositoryMock.Object,
            _newsRepositoryMock.Object);

        //Act
        var result = await handler.Handle(command, default);

        //Assert
        Assert.IsFalse(result.Success);
        Assert.That(result.InitialException!.GetType().Name, Is.EqualTo("NotFoundException"));
        Assert.That(result.InitialException.Message, Is.EqualTo($"{typeof(News)} with Id: {command.NewsId} was not found!"));
    }
}