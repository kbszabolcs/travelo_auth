using System.Collections.Generic;

public interface ITripRepository{

    bool SaveChanges();

    IEnumerable<Trip> GetAllTrips();
    
    Trip GetTripById(int id);

    void CreateTrip(Trip trip);

    void UpdateTrip(Trip trip);

    void DeleteTrip(Trip trip);

    void DeleteAllTrips();
}