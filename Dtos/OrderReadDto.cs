using System;

public class OrderReadDto {

    public Guid Id { get; set; }
    public Guid TripId { get; set; }
    public Guid UserId { get; set; }
    public DateTime Date { get; set; }
}