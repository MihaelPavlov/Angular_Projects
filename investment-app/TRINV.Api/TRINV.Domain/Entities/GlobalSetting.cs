namespace TRINV.Domain.Entities;

using System.ComponentModel.DataAnnotations;

public class GlobalSetting : BaseEntity
{
    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(250)]
    public string Description { get; set; } = string.Empty;

    public bool IsManageable { get; set; }
}
