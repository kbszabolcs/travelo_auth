using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.Extensions.Options;
using IdentityServer4.EntityFramework.Options;
using travelo_auth.Models;

public class TripDbContext : ApiAuthorizationDbContext<ApplicationUser>
{
    public TripDbContext(
        DbContextOptions options,
        IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
    {}

    public DbSet<Trip> Trips { get; set; }
    
}