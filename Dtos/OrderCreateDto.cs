using System;
using System.ComponentModel.DataAnnotations;

public class OrderCreateDto {

    [Required]
    public Guid TripId { get; set; }

    [Required]
    public Guid UserId { get; set; }
}