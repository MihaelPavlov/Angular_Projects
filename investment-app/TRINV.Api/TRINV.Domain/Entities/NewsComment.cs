namespace TRINV.Domain.Entities;

using System.ComponentModel.DataAnnotations;

public class NewsComment : BaseEntity
{
    [Required]
    public int NewsId { get; set; }

    [Required]
    public int CreatedBy { get; set; }

    public int UpVote { get; set; }

    public int DownVote { get; set; }

    public DateTime CreatedOn { get; set; }

    public DateTime UpdatedOn { get; set; }
}