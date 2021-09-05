using System;
using System.ComponentModel.DataAnnotations;

public class TripImage {

    public Guid TripImageId { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public byte[] Image { get; set; }
}