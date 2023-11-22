namespace TRINV.Domain.Entities
{
    using System.ComponentModel.DataAnnotations;
    using static Validations.EntityValidationConstants.GlobalSetting;

    public class GlobalSetting
    {
        public GlobalSetting()
        {
            IsManageable = false;
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(NameMaxLength)]
        public string Name { get; set; } = null!;

        [Required]
        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; } = null!;

        public bool IsManageable { get; set; }
    }
}
