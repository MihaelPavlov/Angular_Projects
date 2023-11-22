namespace TRINV.Domain.Entities
{
    using System.ComponentModel.DataAnnotations;
    using Enums;

    public class Investment
    {
        public Investment()
        {
            IsFromOutsideProvider = false;
        }

        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required] 
        public string Name { get; set; } = null!;

        public int Symbol { get; set; }

        public int Quantity { get; set; }

        public decimal PurchasePrice { get; set; }

        public InvestmentType InvestmentType { get; set; }

        public DateTime CreatedOn { get; set; }

        public bool IsFromOutsideProvider { get; set; }
        
    }
}
