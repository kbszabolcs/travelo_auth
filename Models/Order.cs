using System;
using System.ComponentModel.DataAnnotations;


public class Order {

    [Required]
    public Guid Id { get; set; }

    [Required]
    public Guid TripId { get; set; }

    [Required]
    public Guid UserId { get; set; }

    [Required]
    public DateTime Date { get; set; }
    
}