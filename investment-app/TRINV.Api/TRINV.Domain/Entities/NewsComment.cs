namespace TRINV.Domain.Entities
{
    using System.ComponentModel.DataAnnotations;

    public class NewsComment
    {
        public NewsComment()
        {
            this.UpVote = 0;
            this.DownVote = 0;
        }

        [Key]
        public int Id { get; set; }

        [Required]
        public int NewsId { get; set; }

        [Required]
        public int CreatedBy { get; set; }

        public int UpVote { get; set; }

        public int DownVote { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime UpdatedOn { get; set;}

    }
}
