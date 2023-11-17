using Duende.IdentityServer;
using Duende.IdentityServer.Models;

namespace TRINV.IdentityServer.Data.Seed;

internal static class PredefinedClients
{
    internal static List<Client> GetClients()
    {
        var mainClient = new Client
        {
            ClientId = "WebClient_ID",
            //ClientSecrets = { new Secret("WebClient_Secret".ToSha256()) },

            // Used Authorization Code Flow for authentication for authentication & authorization.
            AllowedGrantTypes = GrantTypes.Code,

            // Requires a PKCE code.
            RequirePkce = true,
            RequireClientSecret = false,
            
            // Where to redirect to after login.
            RedirectUris =new List<string> { "http://localhost:4200/sign-in-callback"},
            AllowedCorsOrigins = { "http://localhost:4200" },

            // Where to redirect to after logout.
            PostLogoutRedirectUris = new List<string> { "http://localhost:4200/sign-out-callback" },
            //BackChannelLogoutUri = "http://localhost:4200/backchannel-logout",
            AllowedScopes =
                {
                    "main_api",
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile
                },

            // Disables the consent page - the one where the user agrees to share his data.
            AllowAccessTokensViaBrowser = true,
            RequireConsent = false
        };

        return new List<Client>
        {
            mainClient
        };
    }
}
