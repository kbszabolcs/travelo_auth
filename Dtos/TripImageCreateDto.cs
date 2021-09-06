using System;
using System.ComponentModel.DataAnnotations;

public class TripImageCreateDto {

    [Required]
    public string Name { get; set; }

    [Required]
    public string Image { get; set; }
}