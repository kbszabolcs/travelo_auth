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

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Seed();

    }
    public DbSet<Trip> Trips { get; set; }
    
    public DbSet<TripImage> TripImages { get; set; }

    public DbSet<Order> Orders { get; set; }

}