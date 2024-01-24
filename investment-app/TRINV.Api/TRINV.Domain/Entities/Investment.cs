namespace TRINV.Domain.Entities;

using System.ComponentModel.DataAnnotations;
using Enums;

public class Investment : BaseEntity
{
    [Required]
    public int UserId { get; set; }

    [Required]
    public string AssetId { get; set; } = string.Empty;

    [Required]
    public string Name { get; set; } = null!;

    [Required]
    public decimal Quantity { get; set; }

    [Required]
    public decimal PurchasePrice { get; set; }

    [Required]
    public decimal PurchasePricePerUnit { get; set; }

    [Required]
    public InvestmentType InvestmentType { get; set; }

    [Required]
    public DateTime CreatedOn { get; set; }

    public bool IsFromOutsideProvider { get; set; }
}