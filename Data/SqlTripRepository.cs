using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

public class SqlTripRepository : ITripRepository
{
    private TripDbContext _context;

    public SqlTripRepository(TripDbContext context)
    {
        _context = context;
    }

    public bool SaveChanges()
    {
        return (_context.SaveChanges() >= 0);
    }

    public void CreateTrip(Trip trip)
    {
        if(trip is null) throw new System.ArgumentNullException(nameof(trip));
        
        _context.Trips.Add(trip);
    }

    public IEnumerable<Trip> GetAllTrips()
    {
        return _context.Trips
                .Include(t => t.TripImage)
                .ToList();
    }

    public Trip GetTripById(Guid id)
    {
        return _context.Trips
            .Include( t => t.TripImage)
            .FirstOrDefault(p => p.Id == id);
    }

    public void UpdateTrip(Trip trip){}

    public void DeleteTrip(Trip trip){
        if(trip is null) throw new System.ArgumentNullException(nameof(trip));

        _context.Trips.Remove(trip);
    }

    public void DeleteAllTrips(){
        _context.Trips.RemoveRange(_context.Trips);
    }
}