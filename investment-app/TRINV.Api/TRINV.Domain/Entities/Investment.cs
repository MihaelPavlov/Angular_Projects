namespace TRINV.Domain.Entities;

using System.ComponentModel.DataAnnotations;
using Enums;
using static Validations.EntityValidationConstants.Investment;

public class Investment : BaseEntity
{
    [Required]
    public int UserId { get; set; }

    [Required]
    [MaxLength(NameMaxLength)]
    public string Name { get; set; } = null!;

    [Required]
    public int Symbol { get; set; }

    [Required]
    public int Quantity { get; set; }

    [Required]
    public decimal PurchasePrice { get; set; }

    [Required]
    public InvestmentType InvestmentType { get; set; }

    [Required]
    public DateTime CreatedOn { get; set; }

    public bool IsFromOutsideProvider { get; set; }
}