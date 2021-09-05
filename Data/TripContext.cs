using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.Extensions.Options;
using IdentityServer4.EntityFramework.Options;
using travelo_auth.Models;
using System.IO;
using System.Collections.Generic;

public class TripDbContext : ApiAuthorizationDbContext<ApplicationUser>
{
    public TripDbContext(
        DbContextOptions options,
        IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
    {}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        /* 
        *********************************
            Seed data to the database
        *********************************
        */

        // Seed relations
        builder.Entity<Trip>()
            .HasOne<TripImage>(t => t.TripImage)
            .WithOne();

        // Seed TripImages
        DirectoryInfo directoryInfo = new DirectoryInfo("Data/Seed/TripImages");
        FileInfo[] fileInfos = directoryInfo.GetFiles();

        List<TripImage> tripImages = new List<TripImage>();
        foreach(FileInfo fileInfo in fileInfos){
            string name = fileInfo.Name.Substring(0, fileInfo.Name.IndexOf('.'));
            byte[] imageData = new byte[fileInfo.Length];
            using(FileStream fs = fileInfo.OpenRead())
            {
                fs.Read(imageData, 0, imageData.Length);
            }

            tripImages.Add(new TripImage
            {
                TripImageId = System.Guid.NewGuid(),
                Name = name,
                Image = imageData
            });
        }

        builder.Entity<TripImage>().HasData(tripImages.ToArray());


        // Seed Trips
        Trip[] tripsToSeed = {
            new Trip{
                Id = System.Guid.NewGuid(),
                Name = "Singapore",
                Description = "Singapore, officially the Republic of Singapore, is a sovereign island city-state in maritime Southeast Asia.",
                Distance = 1000,
                Duration = 2,
                Price = 4200,
                ImagePath = "",
                TripImageId = tripImages.Find(x => x.Name == "Singapore").TripImageId
            },
            new Trip{
                Id = System.Guid.NewGuid(),
                Name = "Thailand",
                Description = "Thailand is a Southeast Asian country. It's known for tropical beaches, opulent royal palaces.",
                Distance = 1200,
                Duration = 3,
                Price = 67000,
                ImagePath = "",
                TripImageId = tripImages.Find(x => x.Name == "Thailand").TripImageId
            },
            new Trip{
                Id = System.Guid.NewGuid(),
                Name = "Paris",
                Description = "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture.",
                Distance = 560,
                Duration = 2,
                Price = 80000,
                ImagePath = "",
                TripImageId = tripImages.Find(x => x.Name == "Paris").TripImageId
            },
            new Trip{
                Id = System.Guid.NewGuid(),
                Name = "New Zealand",
                Description = "New Zealand is an island country in the southwestern Pacific Ocean. It consists of two main landmasses.",
                Distance = 1300,
                Duration = 1,
                Price = 46000,
                ImagePath = "",
                TripImageId = tripImages.Find(x => x.Name == "New Zealand").TripImageId
            },
            new Trip{
                Id = System.Guid.NewGuid(),
                Name = "Bora Bora",
                Description = "Bora Bora is a small South Pacific island northwest of Tahiti in French Polynesia. Surrounded by sand.",
                Distance = 1400,
                Duration = 4,
                Price = 73000,
                ImagePath = "",
                TripImageId = tripImages.Find(x => x.Name == "Bora Bora").TripImageId
            },
            new Trip{
                Id = System.Guid.NewGuid(),
                Name = "London",
                Description = "London, the capital of England and the United Kingdom, is a 21st-century city with history stretching.",
                Distance = 850,
                Duration = 2,
                Price = 48000,
                ImagePath = "",
                TripImageId = tripImages.Find(x => x.Name == "London").TripImageId
            },
            new Trip{
                Id = System.Guid.NewGuid(),
                Name = "Alaska",
                Description = "Alaska is by far the largest U.S. state by area, comprising more total area than the next three largest states Texas, California, and Montana combined, and the seventh largest subnational division in the world.",
                Distance = 3400,
                Duration = 4,
                Price = 93000,
                ImagePath = "",
                TripImageId = tripImages.Find(x => x.Name == "Alaska").TripImageId
            },
            new Trip{
                Id = System.Guid.NewGuid(),
                Name = "China",
                Description = "China emerged as one of the world's first civilizations, in the fertile basin of the Yellow River in the North China Plain. China was one of the world's foremost economic powers for most of the two millennia from the 1st until the 19th century.",
                Distance = 2500,
                Duration = 3,
                Price = 51000,
                ImagePath = "",
                TripImageId = tripImages.Find(x => x.Name == "China").TripImageId
            }
        };

        builder.Entity<Trip>().HasData(tripsToSeed);


    }
    public DbSet<Trip> Trips { get; set; }
    
    public DbSet<TripImage> TripImages { get; set; }

}