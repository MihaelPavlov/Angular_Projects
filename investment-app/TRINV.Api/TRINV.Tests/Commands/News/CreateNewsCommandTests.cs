namespace TRINV.UnitTests.Commands.News;

using Application.Commands.News;
using Application.Interfaces;
using Domain.Entities;
using Moq;

public class CreateNewsCommandTests
{
    readonly Mock<IRepository<News>> _newsRepositoryMock;
    readonly Mock<IUnitOfWork> _unitOfWorkMock;
    readonly Mock<IUserContext> _userContextMock;

    public CreateNewsCommandTests()
    {
        _unitOfWorkMock = new();
        _newsRepositoryMock = new();
        _userContextMock = new();
    }
    //TODO: Set up tests
    [SetUp]
    public void Setup()
    {
    }

    [Test]
    public async Task Handle_Should_Create_NewNews()
    {
        //Arrange
        var command = new CreateNewsCommand();

        var handler = new CreateNewsCommandHandler(
            _newsRepositoryMock.Object,
            _unitOfWorkMock.Object,
            _userContextMock.Object);

        //Act
        var result = await handler.Handle(command, default);

        //Assert
        Assert.That(result.Success, Is.True);
    }
}
