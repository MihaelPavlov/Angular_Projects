﻿namespace TRINV.Domain.Entities
{
    using System.ComponentModel.DataAnnotations;
    using static Validations.EntityValidationConstants.News;

    public class News
    {
        public News()
        {
            this.ViewsCount = 0;
            this.UpVote = 0;
            this.DownVote = 0;
        }

        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        [Required]
        [MaxLength(NameMaxLength)]
        public string Name { get; set; } = null!;

        [Required]
        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; } = null!;

        [Required]
        public int ViewsCount { get; set;}

        [Required]
        public int UpVote { get; set; }

        [Required]
        public int DownVote { get; set; }

        [Required]
        [MaxLength(ImageUrlMaxLength)]
        public string ImageUrl { get; set; } = null!;

    }
}
