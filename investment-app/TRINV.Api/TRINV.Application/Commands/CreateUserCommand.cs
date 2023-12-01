namespace TRINV.Application.Commands;

using MediatR;

public record CreateUserCommand : IRequest<int>;

internal class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, int>
{
    public Task<int> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        return Task.FromResult(1);
    }
}