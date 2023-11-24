namespace TRINV.Domain.Entities;

using System.ComponentModel.DataAnnotations;
using static Validations.EntityValidationConstants.GlobalSetting;

public class GlobalSetting
{

    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(NameMaxLength)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(DescriptionMaxLength)]
    public string Description { get; set; } = string.Empty;

    public bool IsManageable { get; set; }
}

