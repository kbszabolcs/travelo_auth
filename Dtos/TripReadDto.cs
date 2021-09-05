using System;
using System.ComponentModel.DataAnnotations;

public class TripReadDto{

    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Price { get; set; }
    public string ImagePath { get; set; }
    public Guid TripImageId { get; set; }
    public TripImage TripImage { get; set; }
    public string Description { get; set; }
    public int Distance { get; set; }
    public int Duration { get; set; }
}