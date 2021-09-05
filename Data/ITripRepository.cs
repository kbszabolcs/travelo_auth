using System;
using System.Collections.Generic;

public interface ITripRepository{

    bool SaveChanges();

    IEnumerable<Trip> GetAllTrips();
    
    Trip GetTripById(Guid id);

    void CreateTrip(Trip trip);

    void UpdateTrip(Trip trip);

    void DeleteTrip(Trip trip);

    void DeleteAllTrips();
}