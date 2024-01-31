namespace TRINV.Domain.Entities;

using System.ComponentModel.DataAnnotations;

public class NewsComment : BaseEntity
{
    [Required]
    public int NewsId { get; set; }

    [Required]
    public int CreatedBy { get; set; }

    [Required]
    [MaxLength(255)]
    public string Comment { get; set; } = string.Empty;

    public int UpVote { get; set; }

    public int DownVote { get; set; }

    public DateTime CreatedOn { get; set; }

    public DateTime? UpdatedOn { get; set; }

    public News News { get; set; } = null!;
}