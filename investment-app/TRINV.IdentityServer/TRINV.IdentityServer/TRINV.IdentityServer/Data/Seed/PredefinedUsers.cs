using IdentityModel;
using System.Security.Claims;
using TRINV.IdentityServer.Application.Common.Models;
using TRINV.IdentityServer.Application.Infrastructure;
using TRINV.IdentityServer.Data.Models;
using static TRINV.IdentityServer.Data.Seed.PredefinedUsers;

namespace TRINV.IdentityServer.Data.Seed;

internal static class PredefinedUsers
{
    internal static List<SeedUser> GetUsers(IEnvironmentSettings environment)
    {
        var users = new List<SeedUser>
        {
            new SeedUser
            {
                UserName = environment.SuperAdmin.Email,
                Password = environment.SuperAdmin.Password,
                Email = environment.SuperAdmin.Email,
                EmailConfirmed = true,
                AccountEnabled = true,
                Claims =
                {
                    new Claim(Claims.RoleKey, ((int)Role.Admin).ToString()),
                }
            }
        };

        if (!environment.IsLocal)
            return users;

        users.AddUser("user@trinv.com", Role.User);

        //Uncomment: If we need more users for loadtesting
        /*for (int i = 100; i <= 200; i++)
        {
            users.Add(new SeedUser
            {
                Id = i,
                UserName = $"user{i}@loadtesting.trinv.com",
                Password = $"password{i}",
                Email = $"user{i}@loadtesting.trinv.com",
                EmailConfirmed = true,
                AccountEnabled = true,
                Claims =
                {
                    new Claim(Claims.RoleKey, ((int)Role.Admin).ToString()),
                }
            });
        }*/

        return users;
    }

    internal class SeedUser : ApplicationUser
    {
        public string Password { get; init; } = string.Empty;
        public ICollection<Claim> Claims { get; set; } = new HashSet<Claim>(new ClaimComparer());
    }
}

internal static class UsersHelper
{
    internal static void AddUser(this List<SeedUser> users, string email, Role role)
    {
        users.Add(new SeedUser
        {
            UserName = email,
            Password = "1qaz!QAZ",
            Email = email,
            EmailConfirmed = true,
            AccountEnabled = true,
            Claims =
            {
                new Claim(Claims.RoleKey, role.ToString()),
            }
        });
    }
}