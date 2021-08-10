using System.ComponentModel.DataAnnotations;

public class Trip{

    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Name { get; set; }

    [Required]
    [MaxLength(250)]
    public string Description { get; set; }
    
    [Required]
    public int Price { get; set; }

    [Required]
    public string ImagePath { get; set; }

    public int Distance { get; set; }
    
    public int Duration { get; set; }
}
