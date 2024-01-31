namespace TRINV.Domain.Entities;

using System.ComponentModel.DataAnnotations;

public class News : BaseEntity
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    [MaxLength(200)]
    public string ShortDescription { get; set; } = string.Empty;

    [Required]
    public string ImageUrl { get; set; } = string.Empty;

    [Required]
    public int TimeToRead { get; set; }

    public int UserId { get; set; }

    public int Views { get; set; }

    public int UpVote { get; set; }

    public int DownVote { get; set; }

    public List<NewsComment> Comments { get; set; } = new();
}