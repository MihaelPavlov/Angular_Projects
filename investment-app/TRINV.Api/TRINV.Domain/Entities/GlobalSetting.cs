namespace TRINV.Domain.Entities
{
    using System.ComponentModel.DataAnnotations;

    public class GlobalSetting
    {
        public GlobalSetting()
        {
            IsManageable = false;
        }

        [Key]
        public int Id { get; set; }

        [Required] 
        public string Name { get; set; } = null!;

        [Required]
        public string Description { get; set; } = null!;

        public bool IsManageable { get; set; }
    }
}
